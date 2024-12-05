import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { debounce } from "lodash";
import { Button } from "@mui/material";
import { ReactReader, ReactReaderStyle } from 'react-reader'
import moment from "moment";

import { User } from "services/User";
import { BOOKS } from "pathnameVariables";
import { defaultStyles } from "pages/Settings";

import CloseIcon from '@mui/icons-material/Close';
import "./styles.scss";

const BookReader = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const rendition = useRef(undefined)
  const [bookData, setBookData] = useState({});
  const [showUi, setShowUi] = useState(true);

  useEffect(() => {
    getBookData(bookId);

    window.addEventListener("beforeunload", () => updatePosition());
    return () => {
      window.removeEventListener("beforeunload", () => updatePosition());
    };
  }, [bookId]);

  const getBookData = async (id) => {
    try {
      const res = await User.getBookInfo(id);
      setBookData(res?.result || null);
    } catch (e) {
      console.log(e)
    }
  };

  const updatePosition = position => {
    try {
      User.updateBookInfo({
        bookId,
        position: position || bookData.position,
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      });
    } catch (e) {
      console.log(e)
    }
  }

  const debouncedUpdateLocation = useCallback(debounce(updatePosition, 15000, { maxWait: 30000 }), []);

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

  const updateTheme = (rendition) => {
    const themes = rendition.themes
    themes.override('font-size', savedStyles.fontSize);
    themes.override('color', savedStyles.color);
    themes.override('background', savedStyles.background);
    themes.override('padding-top', savedStyles.paddingTop);
    themes.override('padding-bottom', savedStyles.paddingBottom);
    themes.override('padding-left', savedStyles.paddingLeft);
    themes.override('padding-right', savedStyles.paddingRight);
  }

  const arrowBtnStyles = {
    height: "calc(100% - 48px)",
    width: "75px",
    bottom: 0,
    top: "unset",
    zIndex: 3
  }

  const darkReaderTheme = {
    ...ReactReaderStyle,
    reader: {
      ...ReactReaderStyle.reader,
      top: savedStyles.paddingTop,
      bottom: savedStyles.paddingBottom,
      left: savedStyles.paddingLeft,
      right: savedStyles.paddingRight,
      zIndex: 2
    },
    loadingView: {
      ...ReactReaderStyle.loadingView,
      color: savedStyles.color,
    },
    next: {
      ...ReactReaderStyle.next,
      ...arrowBtnStyles,
      textAlign: "end"
    },
    prev: {
      ...ReactReaderStyle.prev,
      ...arrowBtnStyles,
      textAlign: "start"
    },
    arrow: {
      ...ReactReaderStyle.arrow,
      color: savedStyles.showArrow !== "false" ? savedStyles.arrowColor : "transparent",
    },
    arrowHover: {
      ...ReactReaderStyle.arrowHover,
      color: savedStyles.color,
    },
    readerArea: {
      ...ReactReaderStyle.readerArea,
      backgroundColor: savedStyles.background,
      transition: undefined,
    },
    titleArea: {
      ...ReactReaderStyle.titleArea,
      color: savedStyles.color,
    },
    tocArea: {
      ...ReactReaderStyle.tocArea,
      background: savedStyles.background,
    },
    tocButtonExpanded: {
      ...ReactReaderStyle.tocButtonExpanded,
      background: savedStyles.background,
    },
    tocButtonBar: {
      ...ReactReaderStyle.tocButtonBar,
      background: savedStyles.color,
    },
    tocButton: {
      ...ReactReaderStyle.tocButton,
      color: savedStyles.color,
      zIndex: 4,
      left: 8,
      transition: "0.3s all",
      opacity: showUi ? 1 : 0
    },
  };

  return (
    <div className="book-reader-wrapper">
      <div className="toggle-ui-button" onClick={() => setShowUi(!showUi)} />
      <Button style={{ color: savedStyles.color, background: savedStyles.backgroundColor }} className={`close-btn ${!showUi ? "hidden" : ""}`} onClick={handleClose}>
        <CloseIcon />
      </Button>
      <ReactReader
        swipeable
        location={bookData.position}
        url={bookData.url}
        locationChanged={epubcfi => {
          if (epubcfi !== bookData.position) {
            setBookData(prevState => ({ ...prevState, position: epubcfi }));
            debouncedUpdateLocation(epubcfi);
          }
        }}
        readerStyles={darkReaderTheme}
        getRendition={_rendition => {
          updateTheme(_rendition);
          rendition.current = _rendition
        }}
      />
    </div>
  )
};

export default BookReader;
