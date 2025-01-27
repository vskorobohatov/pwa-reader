import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import { getBooksList } from 'store/sagas/booksList';
import UploadPopover from 'components/UploadPopover';

import AddIcon from '@mui/icons-material/Add';

import './styles.scss';

export const addBookComponentKey = "add-book-component";

const AddBookComponent = () => {
  const dispatch = useDispatch();
  const [addBookPopoverState, setAddBookPopoverState] = useState(null);

  return (
    <div className='add-book-wrapper'>
      <Button className="add-book-btn" onClick={e => setAddBookPopoverState(e.currentTarget)}>
        <AddIcon />
      </Button>
      <UploadPopover
        state={addBookPopoverState}
        setState={setAddBookPopoverState}
        onSuccess={()=>dispatch(getBooksList())}
      />
    </div>
  );
}

export default AddBookComponent;
