import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import "./styles.scss"; 

const Loader = () => {
  return (
    <div className='loader-wrapper'>
      <CircularProgress />
    </div>
  );
}

export default Loader;