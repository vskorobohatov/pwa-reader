import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";

import { User } from "services/User";
import { BOOKS } from "pathnameVariables";
import { formatBytes } from "helpers/format";

import StyledTextField from "components/StyledTextField";
import DefaultPopover, { PopoverItem } from "components/DefaultPopover";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ModalWrapper from "components/ModalWrapper";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./styles.scss";

const Books = () => {
  const navigate = useNavigate();
  const [popoverState, setPopoverState] = useState(null);
  const [addBookPopoverState, setAddBookPopoverState] = useState(null);
  const [activeBook, setActiveBook] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [linkToUpload, setLinkToUpload] = useState("");
  const [uploadError, setUploadError] = useState(null);
  const [books, setBooks] = useState([
    // {
    //   id: 1,
    //   name: "Test book for development purposes. Ignore it."
    // }
  ]);

  useEffect(() => {
    getBooksList();
  }, []);

  const getBooksList = async () => {
    try {
      const res = await User.getBooks();
      setBooks(res?.books || []);
    } catch (e) {
      console.log(e);
    }
  };

  const handleBookMenuClick = (e, book) => {
    e.preventDefault();
    e.stopPropagation();
    setPopoverState(e.currentTarget);
    setActiveBook(book);
  };

  const handleUploadFile = async () => {
    try {
      const data = new FormData();
      data.append('file', fileToUpload);
      await User.addBook(data);
      setAddBookPopoverState(null);
      toast.success("File was uploaded successfully!");
      getBooksList();
    } catch (e) {
      console.log(e);
      setUploadError(e?.response?.data?.message || "Something went wrong...");
    }
  };

  const handleDelete = async () => {
    try {
      await User.deleteBook(activeBook.id);
      toast.success("File was uploaded successfully!");
      getBooksList();
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message || "Something went wrong...");
    } finally {
      closeDeleteModals();
    }
  };

  const clearUploadForm = () => {
    setTimeout(() => {
      setFileToUpload(null);
      setLinkToUpload("");
    }, 150);
  };

  const closeDeleteModals = () => {
    setActiveBook(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="books-wrapper">
      {books.map(book => (
        <div className="book-item" key={book.id} onClick={() => navigate(`${BOOKS}/${book.id}`)}>
          <div className="name">{book.name}</div>
          <Button className="menu-btn" onClick={e => handleBookMenuClick(e, book)}>
            <MoreVertIcon />
          </Button>
        </div>
      ))}

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

      <DefaultPopover className="dropzone-popover" state={addBookPopoverState} setState={setAddBookPopoverState} onClose={clearUploadForm}>
        <div className="title">
          Upload file
          <Button onClick={() => setAddBookPopoverState(false)} className="close-modal-btn">
            <CloseIcon />
          </Button>
        </div>
        {!!fileToUpload ? (
          <div className="file-info-wrapper">
            <div className="info-item">
              <div className="item-label">Name</div>
              <div className="item-value">{fileToUpload.name}</div>
            </div>
            <div className="info-item">
              <div className="item-label">Size</div>
              <div className="item-value">{formatBytes(fileToUpload.size)}</div>
            </div>
          </div>
        ) : (
          <>
            <Dropzone
              onDrop={acceptedFiles => {
                setFileToUpload(acceptedFiles[0]);
                setUploadError("");
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone-wrapper">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="dropzone-label">Drag 'n' drop file here, <br />or click to select file</div>
                  </div>
                </div>
              )}
            </Dropzone>
            <div className="divider">
              <span></span>
              <div>or</div>
              <span></span>
            </div>
            <StyledTextField
              label="Link to the file"
              placeholder="https://example.com/file.epub"
              value={linkToUpload}
              onChange={e => {
                setLinkToUpload(e.target.value);
                setUploadError("");
              }}
            />
          </>
        )}
        <Button className="upload-btn" onClick={handleUploadFile}>Confirm</Button>
        {uploadError && <div className="error-text">{uploadError}</div>}
      </DefaultPopover>
    </div>
  )
};

export default Books;
