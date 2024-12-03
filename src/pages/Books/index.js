import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Dropzone from "react-dropzone";

import { User } from "services/User";
import { BOOKS } from "pathnameVariables";

import StyledTextField from "components/StyledTextField";
import DefaultPopover, { PopoverItem } from "components/DefaultPopover";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./styles.scss";
import { formatBytes } from "helpers/format";

const Books = () => {
  const navigate = useNavigate();
  const [popoverState, setPopoverState] = useState(null);
  const [addBookPopoverState, setAddBookPopoverState] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [linkToUpload, setLinkToUpload] = useState("");
  const [books, setBooks] = useState([
    {
      id: 1,
      name: "Test book"
    }
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

  const handleBookMenuClick = e => {
    e.preventDefault();
    e.stopPropagation();
    setPopoverState(e.currentTarget)
  };

  const handleUploadFile = async () => {
    try {
      const data = new FormData();
      data.append('file', fileToUpload);
      await User.addBook(data);
      setAddBookPopoverState(null);
      getBooksList();
    } catch (e) {
      console.log(e)
    }
  };

  const clearUploadForm = () => {
    setFileToUpload(null);
    setLinkToUpload("");

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

      <Button className="add-book-btn" onClick={e => setAddBookPopoverState(e.currentTarget)}>
        <AddIcon />
      </Button>

      <DefaultPopover state={popoverState} setState={setPopoverState}>
        <PopoverItem icon={<EditIcon />} label="Edit" />
        <PopoverItem isDelete icon={<DeleteOutlineIcon />} label="Delete" />
      </DefaultPopover>

      <DefaultPopover className="dropzone-popover" state={addBookPopoverState} setState={setAddBookPopoverState} onClose={clearUploadForm}>
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
            <Dropzone onDrop={acceptedFiles => setFileToUpload(acceptedFiles[0])}>
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone-wrapper">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="dropzone-label">Drag 'n' drop some files here, or click to select files</div>
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
              placeholder="Enter the URL (e.g., https://example.com/file.epub)"
              value={linkToUpload}
              onChange={e => setLinkToUpload(e.target.value)}
            />
          </>
        )}
        <Button className="upload-btn" onClick={handleUploadFile}>Upload</Button>
      </DefaultPopover>
    </div>
  )
};

export default Books;
