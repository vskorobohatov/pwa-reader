import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';

import './styles.scss';

export const saveSettingsButtonKey = "save-settings-button";

const SaveSettingsButton = ({onClick}) => {

  return (
    <div className='save-settings-wrapper'>
      <Button className="save-btn" onClick={onClick}>
        <SaveIcon />
      </Button>
    </div>
  );
}

export default SaveSettingsButton;
