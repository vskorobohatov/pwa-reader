import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactReader } from 'react-reader'

import { User } from "services/User";

import "./styles.scss";
import { debounce } from "lodash";

const BookReader = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(
    { url: "", position: 0 }
    // {
    //   "name": "2hgfh.epub",
    //   "url": "https://scalan.com/apps/reader/books/1/2hgfh.epub",
    //   "uploadedAt": "2024-12-04 14:09:55",
    //   "size": 683370,
    //   "position": "0",
    //   "updatedAt": null
    // }
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
        updatedAt: new Date().toString()
      });
    } catch (e) {
      console.log(e)
    }
  }

  const debouncedUpdateLocation = useCallback(debounce(updateLocation, { wait: 60000, maxWait: 60000 }), []);

  return (
    <div className="book-reader-wrapper">
      <ReactReader
        location={+bookData.position}
        url={bookData.url}
        locationChanged={epubcfi => {
          if (epubcfi !== +bookData.position) {
            setBookData(prevState => ({ ...prevState, position: epubcfi }));
            debouncedUpdateLocation(epubcfi);
          }
        }}
      />
    </div>
  )
};

export default BookReader;
