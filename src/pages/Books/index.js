import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { User } from "services/User";
import { BOOKS } from "pathnameVariables";
import { setHeaderSideComponent } from "store/reducers/ui";

import Loader from "components/Loader";
import UploadPopover from "components/UploadPopover";
import { booksFiltersComponentKey } from "components/BooksFilters";
import DefaultPopover, { PopoverItem } from "components/DefaultPopover";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ModalWrapper from "components/ModalWrapper";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./styles.scss";

const Books = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sortBy, sortDirection } = useSelector(store => store.booksList);
  const [popoverState, setPopoverState] = useState(null);
  const [addBookPopoverState, setAddBookPopoverState] = useState(null);
  const [activeBook, setActiveBook] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updateHeader(booksFiltersComponentKey);
    getBooksList();
    return () => {
      updateHeader(null);
    }
  }, []);

  const updateHeader = val => dispatch(setHeaderSideComponent(val));

  const getBooksList = async () => {
    try {
      setIsLoading(true);
      const res = await User.getBooks();
      setBooks(res?.books ? orderBy(res?.books, sortBy, sortDirection) : []);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateBooksSort();
  }, [sortBy, sortDirection]);

  const updateBooksSort = () => setBooks(prevState => orderBy(prevState, sortBy, sortDirection));

  const handleBookMenuClick = (e, book) => {
    e.preventDefault();
    e.stopPropagation();
    setPopoverState(e.currentTarget);
    setActiveBook(book);
  };

  const handleDelete = async () => {
    try {
      await User.deleteBook(activeBook.id);
      toast.success("File was deleted successfully!");
      getBooksList();
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message || "Something went wrong...");
    } finally {
      closeDeleteModals();
    }
  };

  const closeDeleteModals = () => {
    setActiveBook(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="books-wrapper">
      {isLoading ? (
        <Loader />
      ) : !!books.length ? (
        <div className="books-list">
          {books.map(book => (
            <div className="book-item" key={book.id} onClick={() => navigate(`${BOOKS}/${book.id}`)}>
              <div className="name">{book.name}</div>
              <Button className="menu-btn" onClick={e => handleBookMenuClick(e, book)}>
                <MoreVertIcon />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-box">
          You don't have any books...
        </div>
      )}

      <Button className="add-book-btn" onClick={e => setAddBookPopoverState(e.currentTarget)}>
        <AddIcon />
      </Button>

      <DefaultPopover state={popoverState} setState={setPopoverState}>
        <PopoverItem icon={<EditIcon />} label="Edit" />
        <PopoverItem
          isDelete
          icon={<DeleteOutlineIcon />}
          label="Delete"
          onClick={() => {
            setShowDeleteModal(true);
            setPopoverState(null);
          }}
        />
      </DefaultPopover>

      <ModalWrapper
        title="Are you sure?"
        subtitle="This action will remove file and all corresponding data."
        open={showDeleteModal && activeBook}
        onClose={closeDeleteModals}
        contentClassName="confirm-delete-modal"
      >
        <div className="controls-wrapper">
          <Button
            className="cancel"
            onClick={closeDeleteModals}
          >
            Cancel
          </Button>
          <Button
            className="delete"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </ModalWrapper>

      <UploadPopover
        state={addBookPopoverState}
        setState={setAddBookPopoverState}
        onSuccess={getBooksList}
      />
    </div>
  )
};

export default Books;
