import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactReader, ReactReaderStyle } from 'react-reader'
import { debounce } from "lodash";
import moment from "moment";

import { User } from "services/User";
import { defaultStyles } from "pages/Settings";

import "./styles.scss";

const BookReader = () => {
  const { bookId } = useParams();
  const rendition = useRef(undefined)
  const [bookData, setBookData] = useState(
    // { url: "", position: 0 }
    {
      "name": "2hgfh.epub",
      "url": "https:\/\/scalan.com\/apps\/reader\/books\/1\/qazxsw111.epub",
      "uploadedAt": "2024-12-04 14:09:55",
      "size": 683370,
      "position": "0",
      "updatedAt": null
    }
  );

  useEffect(() => {
    getBookData(bookId);
  }, [bookId]);

  const getBookData = async (id) => {
    try {
      const res = await User.getBookInfo(id);
      setBookData(res?.result || null);
    } catch (e) {
      console.log(e)
    }
  };

  const updateLocation = async (location) => {
    try {
      await User.updateBookInfo({
        bookId,
        position: location,
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      });
    } catch (e) {
      console.log(e)
    }
  }

  const debouncedUpdateLocation = useCallback(debounce(updateLocation, 60000, { maxWait: 60000 }), []);

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
      height: "80%",
      bottom: 0,
      top: "unset",
      zIndex: 3
    },
    prev: {
      ...ReactReaderStyle.prev,
      height: "80%",
      bottom: 0,
      top: "unset",
      zIndex: 3
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
      top: 56,
      left: 8
    },
  }

  return (
    <div className="book-reader-wrapper">
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
