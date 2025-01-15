import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import "./styles.scss";

const Loader = ({ style }) => {
  return (
    <div className='loader-wrapper' style={style}>
      <CircularProgress />
    </div>
  );
}

export default Loader;