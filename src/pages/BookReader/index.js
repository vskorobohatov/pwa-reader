import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { debounce } from "lodash";
import { Button } from "@mui/material";
import moment from "moment";

import { User } from "services/User";
import { BOOKS } from "pathnameVariables";
import { getSavedSettings, getSelectionText, isElementInViewport } from "helpers/ui";

import ModalWrapper from "components/ModalWrapper";

import CloseIcon from '@mui/icons-material/Close';
import "./styles.scss";

const defaultPosition = {
  section: 0,
  paragraph: 0
};

const BookReader = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef();
  const contentRef = useRef();
  const [showUi, setShowUi] = useState(false);
  const [sectionsList, setSectionsList] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(defaultPosition);
  const [translationModalState, setTranslationModalState] = useState(false);
  const [translations, setTranslations] = useState([]);

  useEffect(() => {
    getBookData(bookId);
  }, [bookId]);

  useEffect(() => {
    if (sectionsList.length) {
      renderSection(sectionsList, currentPosition);
    }
  }, [sectionsList, currentPosition.section, currentPosition.paragraph])

  useEffect(() => {
    const isTranslationEnabled = getSavedSettings()?.translations !== "disabled";
    if (isTranslationEnabled) {
      document.addEventListener('selectionchange', debouncedTranslateSelection);
      return () => {
        document.removeEventListener('selectionchange', debouncedTranslateSelection);
      }
    }
  }, []);

  const translateSelection = async () => {
    try {
      const selectionText = getSelectionText();
      if (!!selectionText.trim()) {
        const translations = await User.translate(selectionText.trim());
        setTranslationModalState(true);
        setTranslations(translations?.result || []);
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getBookData = async (id) => {
    try {
      const res = await User.getBookInfo(id);
      let position = defaultPosition;
      if (res?.result?.position) {
        position = JSON.parse(res?.result?.position);
      }
      setCurrentPosition(position)
      const sectionsListData = await loadBookSections(res?.result?.url);
      setSectionsList(sectionsListData)
    } catch (e) {
      console.log(e)
    }
  };

  const loadBookSections = async (url) => {
    if (!url) return;

    let bookContent;

    const cache = await caches.open("books-cache");
    const cachedResponse = await cache.match(url);
    if (cachedResponse) {
      bookContent = await cachedResponse.blob();
    } else {
      bookContent = await fetch(url).then(res => {
        const cloned = res.clone();
        cache.put(url, res);
        return cloned.blob();
      });
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(reader.result, "application/xml");
          resolve(Array.from(doc.getElementsByTagName("section")))
        },
        false,
      );

      reader.readAsText(bookContent);
    })
  }

  const updatePosition = position => {
    try {
      const paragraphs = Array.from(contentRef.current.getElementsByTagName("p"));
      const firstVisibleElem = paragraphs.findIndex(elem => isElementInViewport(elem));
      User.updateBookInfo({
        bookId,
        position: JSON.stringify({ ...position, paragraph: firstVisibleElem }),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      });
    } catch (e) {
      console.log(e)
    }
  }

  const renderSection = (list, position) => {
    contentRef.current.innerHTML = "";
    contentRef.current.appendChild(list[position.section]);
    const paragraphs = contentRef.current.getElementsByTagName("p");
    const paragraphToScroll = paragraphs[position.paragraph || 0];
    if (paragraphToScroll) {
      setTimeout(() => {
        paragraphToScroll.scrollIntoView();
      }, 50)
    }
  }

  const debouncedUpdateLocation = useCallback(debounce(updatePosition, 5000, { maxWait: 30000 }), []);
  const debouncedTranslateSelection = useCallback(debounce(translateSelection, 2000), []);

  const handleClose = () => {
    updatePosition(currentPosition);
    navigate(BOOKS);
  }

  const savedStyles = getSavedSettings();

  const bookStyles = {
    paddingTop: savedStyles.paddingTop,
    paddingRight: savedStyles.paddingRight,
    paddingBottom: savedStyles.paddingBottom,
    paddingLeft: savedStyles.paddingLeft,
    fontSize: savedStyles.fontSize,
    fontFamily: savedStyles.fontFamily,
  };

  return (
    <div className="book-reader-wrapper" style={{ color: savedStyles.color, background: savedStyles.background }}>
      <Button className={`close-btn ${!showUi ? "hidden" : ""}`} onClick={handleClose}>
        <CloseIcon />
      </Button>
      <div className="scroll-wrapper" ref={scrollRef} onScroll={() => debouncedUpdateLocation(currentPosition)}>
        <div
          onClick={() => setShowUi(!showUi)}
          className="book-content"
          ref={contentRef}
          style={bookStyles}
        />
        <div className="navigation-controls">
          <Button
            disabled={currentPosition.section === 0}
            onClick={() => {
              const newPosition = { section: currentPosition.section - 1, paragraph: 0 };
              setCurrentPosition(newPosition);
              updatePosition(newPosition);
            }}
          >
            Prev
          </Button>
          <Button
            disabled={currentPosition.section === sectionsList.length - 1}
            onClick={() => {
              const newPosition = { section: currentPosition.section + 1, paragraph: 0 };
              setCurrentPosition(newPosition);
              updatePosition(newPosition);
            }}
          >
            Next
          </Button>
        </div>
      </div>

      <ModalWrapper open={translationModalState} onClose={() => setTranslationModalState(false)} title="Translations">
        <div className="translation-wrapper">
          {translations.map(item => (
            <div className="translation-item" key={`translation-item-${item.word}`}>
              <div className="word">{item.word}</div>
              <div className="translation">{item.translates}</div>
            </div>
          ))}
        </div>
      </ModalWrapper>
    </div>
  )
};

export default BookReader;
