import React, { useEffect, useState } from "react";
import "./styles.scss";
import { User } from "services/User";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await User.getBooks();
      setBooks(res?.books || []);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="books-wrapper">
      {books.map(book => (
        <div className="book-item" key={book.id}>
          <div className="name">{book.name}</div>
        </div>
      ))}
    </div>
  )
};

export default Books;
