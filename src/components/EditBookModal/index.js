import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

import ModalWrapper from "components/ModalWrapper";
import StyledTextField from "components/StyledTextField";

import "./styles.scss";
import { User } from "services/User";
import Loader from "components/Loader";

const defaultFields = {
  name: ""
}

const EditBookModal = ({ state, setState, onSuccess, data }) => {
  const [fields, setFields] = useState(defaultFields);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!!data?.id) {
      setFields({ name: data?.name });
    } else {
      setFields(defaultFields);
    }
  }, [data?.id]);

  const handleUpdateField = e => setFields(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleUpdateBook = async () => {
    try {
      setIsLoading(true);
      await User.editBook(data.id, fields);
      toast.success("Book updated successfully");
      onSuccess();
    } catch (error) {
      toast.error(`Error updating book: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const closeEditModal = () => {
    setFields(defaultFields);
    setState(false);
  };

  return (
    <ModalWrapper
      title="Edit"
      open={state && !!data}
      onClose={closeEditModal}
      contentClassName="edit-book-modal"
    >
      {isLoading ? <Loader /> : null}
      <div className="edit-fields">
        <StyledTextField
          name="name"
          label="Name"
          value={fields.name}
          onChange={handleUpdateField}
          onKeyDown={e => e?.code === "Enter" ? handleUpdateBook() : null}
        />
      </div>
      <div className="controls-wrapper">
        <Button
          className="cancel"
          onClick={closeEditModal}
        >
          Cancel
        </Button>
        <Button
          className="save"
          onClick={handleUpdateBook}
        >
          Save
        </Button>
      </div>
    </ModalWrapper>
  )
};

export default EditBookModal;
