import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import { defaultSettings } from 'helpers/defaults';
import { setSettings } from 'store/reducers/settings';

import DoneIcon from '@mui/icons-material/Done';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

import './styles.scss';

export const resetSettingsButtonKey = "reset-settings-button";

const ResetSettingsButton = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    dispatch(setSettings(defaultSettings))
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  return (
    <div className='reset-settings-wrapper'>
      <Button
        className={success ? "success" : ""}
        onClick={handleClick}
      >
        {success ? <DoneIcon /> : <SettingsBackupRestoreIcon />}
      </Button>
    </div>
  );
}

export default ResetSettingsButton;
