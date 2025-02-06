import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

import { saveValue } from 'helpers/ui';
import { SETTINGS_STORAGE_KEY } from 'storageVariables';

import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';

import './styles.scss';

export const saveSettingsButtonKey = "save-settings-button";

const SaveSettingsButton = () => {
  const settingsData = useSelector(store => store.settings.values);
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    saveValue(SETTINGS_STORAGE_KEY, settingsData);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  return (
    <div className='save-settings-wrapper'>
      <Button
        className={`save-btn ${success ? "success" : ""}`}
        onClick={handleClick}
      >
        {success ? <DoneIcon /> : <SaveIcon />}
      </Button>
    </div>
  );
}

export default SaveSettingsButton;
