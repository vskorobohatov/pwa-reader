import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { User } from "services/User";
import { BOOKS } from "pathnameVariables";
import { getBooksList } from "store/sagas/booksList";
import { setHeaderSideComponent } from "store/reducers/ui";
import { addBookComponentKey } from "components/AddBookComponent";

import Loader from "components/Loader";
import EditBookModal from "components/EditBookModal";
import BooksFiltersComponent from "components/BooksFilters";
import DefaultPopover, { PopoverItem } from "components/DefaultPopover";

import EditIcon from '@mui/icons-material/Edit';
import ModalWrapper from "components/ModalWrapper";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./styles.scss";

const Books = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sortBy, sortDirection, books, isLoading } = useSelector(store => store.booksList);
  const [popoverState, setPopoverState] = useState(null);
  const [activeBook, setActiveBook] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const sortedBooks = orderBy(books, sortBy, sortDirection);

  useEffect(() => {
    updateHeader(addBookComponentKey);
    dispatch(getBooksList());
    return () => {
      updateHeader(null);
    }
  }, []);

  const updateHeader = val => dispatch(setHeaderSideComponent(val));

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
      closeDeleteModal();
    }
  };

  const closeDeleteModal = () => {
    setActiveBook(null);
    setShowDeleteModal(false);
  };

  const closeEditModal = () => {
    setActiveBook(null);
    setShowEditModal(false);
    getBooksList();
  };

  return (
    <div className="books-wrapper">
      {isLoading ? (
        <Loader />
      ) : !!books.length ? (
        <>
          <BooksFiltersComponent />
          <div className="books-list">
            {sortedBooks.map(book => (
              <div className="book-item" key={book.id} onClick={() => navigate(`${BOOKS}/${book.id}`)}>
                <div className="name">{book.name}</div>
                <Button className="menu-btn" onClick={e => handleBookMenuClick(e, book)}>
                  <MoreVertIcon />
                </Button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="empty-box">
          You don't have any books...
        </div>
      )}

      <DefaultPopover state={popoverState} setState={setPopoverState}>
        <PopoverItem
          icon={<EditIcon />}
          label="Rename"
          onClick={() => {
            setShowEditModal(true);
            setPopoverState(null);
          }}
        />
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

      <EditBookModal state={showEditModal} setState={setShowEditModal} onSuccess={closeEditModal} data={activeBook} />

      <ModalWrapper
        title="Are you sure?"
        subtitle="This action will remove file and all corresponding data."
        open={showDeleteModal && activeBook}
        onClose={closeDeleteModal}
        contentClassName="confirm-delete-modal"
      >
        <div className="controls-wrapper">
          <Button
            className="cancel"
            onClick={closeDeleteModal}
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

    </div>
  )
};

export default Books;
