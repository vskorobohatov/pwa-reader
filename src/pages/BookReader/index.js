import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { debounce } from "lodash";
import { Button } from "@mui/material";
import moment from "moment";

import { User } from "services/User";
import { BOOKS } from "pathnameVariables";
import { getSelectionText } from "helpers/ui";
import { defaultStyles } from "pages/Settings";

import CloseIcon from '@mui/icons-material/Close';
import "./styles.scss";

const defaultPosition = {
  section: 0,
  scroll: 0
};

const BookReader = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef();
  const contentRef = useRef();
  const [showUi, setShowUi] = useState(false);
  const [sectionsList, setSectionsList] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(defaultPosition);


  useEffect(() => {
    getBookData(bookId);
  }, [bookId]);

  useEffect(() => {
    if (sectionsList.length) {
      renderSection(sectionsList, currentPosition);
    }
  }, [sectionsList, currentPosition.section, currentPosition.scroll])

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelection);
    return () => {
      document.removeEventListener('selectionchange', handleSelection);
    }
  }, []);

  const handleSelection = () => {
    console.log(getSelectionText());
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
    const bookContent = await fetch(url).then(res => res.blob());
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
      User.updateBookInfo({
        bookId,
        position: JSON.stringify(defaultPosition),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      });
    } catch (e) {
      console.log(e)
    }
  }

  const renderSection = (list, position) => {
    contentRef.current.innerHTML = "";
    contentRef.current.appendChild(list[position.section]);
    scrollRef.current.scrollTo({
      top: position.scroll,
    });
  }

  const debouncedUpdateLocation = useCallback(debounce(updatePosition, 5000, { maxWait: 30000 }), []);

  const handleClose = () => {
    updatePosition();
    navigate(BOOKS);
  }

  const getSavedStyles = () => {
    const bookStyles = localStorage.getItem("bookStyles");
    if (bookStyles) {
      return JSON.parse(bookStyles);
    }
    return defaultStyles;
  };

  const savedStyles = getSavedStyles();

  const bookStyles = {
    paddingTop: savedStyles.paddingTop,
    paddingRight: savedStyles.paddingRight,
    paddingBottom: savedStyles.paddingBottom,
    paddingLeft: savedStyles.paddingLeft,
    fontSize: savedStyles.fontSize,
    fontFamily: savedStyles.fontFamily,
  };

  return (
    <div className="book-reader-wrapper">
      <Button style={{ color: savedStyles.color, background: savedStyles.backgroundColor }} className={`close-btn ${!showUi ? "hidden" : ""}`} onClick={handleClose}>
        <CloseIcon />
      </Button>
      <div className="scroll-wrapper" ref={scrollRef}>
        <div
          onClick={() => setShowUi(!showUi)}
          className="book-content"
          ref={contentRef}
          style={bookStyles}
        />
        <div className="navigation-controls">
          <Button
            disabled={currentPosition.section === 0}
            onClick={() => setCurrentPosition(prevState => ({ section: prevState.section - 1, scroll: 0 }))}
          >
            Prev
          </Button>
          <Button
            disabled={currentPosition.section === sectionsList.length - 1}
            onClick={() => setCurrentPosition(prevState => ({ section: prevState.section + 1, scroll: 0 }))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
};

export default BookReader;
