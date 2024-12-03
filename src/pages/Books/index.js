import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { User } from "services/User";
import { BOOKS } from "pathnameVariables";

import DefaultPopover, { PopoverItem } from "components/DefaultPopover";

import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import "./styles.scss";

const Books = () => {
  const navigate = useNavigate();
  const [popoverState, setPopoverState] = useState(null);
  const [books, setBooks] = useState([
    {
      id: 1,
      name: "Test book"
    }
  ]);

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

  const handleBookMenuClick = e => {
    e.preventDefault();
    e.stopPropagation();
    setPopoverState(e.currentTarget)
  }

  return (
    <div className="books-wrapper">
      {books.map(book => (
        <div className="book-item" key={book.id} onClick={() => navigate(`${BOOKS}/${book.id}`)}>
          <div className="name">{book.name}</div>
          <Button className="menu-btn" onClick={handleBookMenuClick}>
            <MoreVertIcon />
          </Button>
        </div>
      ))}

      <DefaultPopover state={popoverState} setState={setPopoverState}>
        <PopoverItem icon={<EditIcon />} label="Edit" />
        <PopoverItem isDelete icon={<DeleteOutlineIcon />} label="Delete" />
      </DefaultPopover>
    </div>
  )
};

export default Books;
