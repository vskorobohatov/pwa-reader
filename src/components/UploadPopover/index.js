import React, { useState } from "react";
import { Button } from "@mui/material";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";

import { User } from "services/User";
import { formatBytes } from "helpers/format";

import Loader from "components/Loader";
import DefaultPopover from "components/DefaultPopover";
import StyledTextField from "components/StyledTextField";

import CloseIcon from '@mui/icons-material/Close';
import "./styles.scss";
import ModalWrapper from "components/ModalWrapper";

const defaultLinkValue = { name: "", url: "" };

const UploadPopover = ({ state, setState, onSuccess }) => {
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [linkToUpload, setLinkToUpload] = useState(defaultLinkValue);
  const [uploadError, setUploadError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadFile = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        ...filesToUpload.map(file => {
          const fileFormData = new FormData();
          fileFormData.append('file', file);
          return User.uploadFile(fileFormData);
        })
      ]);
      if (!!linkToUpload.name.trim() && !!linkToUpload.url.trim()) {
        await User.uploadLink(linkToUpload);
      }

      setState(false);
      toast.success("File was uploaded successfully!");
      onSuccess();
      clearUploadForm();
    } catch (e) {
      console.log(e);
      setUploadError(e?.response?.data?.message || "Something went wrong...");
    } finally {
      setIsLoading(false);
    }
  };

  const clearUploadForm = () => {
    setState(false);
    setTimeout(() => {
      setFilesToUpload([]);
      setLinkToUpload(defaultLinkValue);
    }, 150);
  };

  return (
    <ModalWrapper
      title="Upload file(s)"
      open={state}
      onClose={clearUploadForm}
      contentClassName="dropzone-popover-content"
    >
      {isLoading && <Loader />}
      {!!filesToUpload.length ? (
        <div className="files-list">
          {filesToUpload.map(file => (
            <div className="file-info-wrapper">
              <div className="info-item name">
                <div className="item-label">Name</div>
                <div className="item-value">{file.name}</div>
              </div>
              <div className="info-item size">
                <div className="item-label">Size</div>
                <div className="item-value">{formatBytes(file.size)}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <Dropzone
            onDrop={acceptedFiles => {
              setFilesToUpload(acceptedFiles);
              setUploadError("");
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone-wrapper">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="dropzone-label">Drag 'n' drop some files here, <br />or click to select files</div>
                </div>
              </div>
            )}
          </Dropzone>
          <div className="divider">
            <span></span>
            <div>or</div>
            <span></span>
          </div>
          <div className="link-upload-wrapper">
            <StyledTextField
              label="File name"
              placeholder="Mybook.epub"
              value={linkToUpload.name}
              onChange={e => {
                setLinkToUpload(prevState => ({ ...prevState, name: e.target.value }));
                setUploadError("");
              }}
            />
            <StyledTextField
              label="Link to the file"
              placeholder="https://example.com/file.epub"
              value={linkToUpload.url}
              onChange={e => {
                setLinkToUpload(prevState => ({ ...prevState, url: e.target.value }));
                setUploadError("");
              }}
            />
          </div>
        </>
      )}
      <Button className="upload-btn" onClick={handleUploadFile}>Confirm</Button>
      {uploadError && <div className="error-text">{uploadError}</div>}
    </ModalWrapper>
  )
};

export default UploadPopover;
