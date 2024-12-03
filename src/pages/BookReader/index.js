import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ReactEpubViewer
} from 'react-epub-viewer'

import { User } from "services/User";

import "./styles.scss";

const BookReader = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    getBookData(bookId);
  }, [bookId]);

  const getBookData = async (id) => {
    try {
      const res = await User.getBookInfo(id);
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className="book-reader-wrapper">
      <ReactEpubViewer
        url={""}
        ref={viewerRef}
      />
    </div>
  )
};

export default BookReader;
