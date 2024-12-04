import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  EpubViewer
} from 'react-epub-viewer'

import { User } from "services/User";

import "./styles.scss";

const BookReader = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState({ url: "", location: 0 });
  const viewerRef = useRef(null);

  useEffect(() => {
    getBookData(bookId);
  }, [bookId]);

  const getBookData = async (id) => {
    try {
      const res = await User.getBookInfo(id);
      console.log(res)
      setBookData(res?.result || null);
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className="book-reader-wrapper">
      <EpubViewer
        location={bookData.location}
        url={bookData.url}
        ref={viewerRef}
      />
    </div>
  )
};

export default BookReader;
