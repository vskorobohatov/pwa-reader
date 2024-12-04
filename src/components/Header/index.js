import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';

import { HOME, SIGN_IN } from 'pathnameVariables';
import { removeToken } from 'helpers/tokenHelper';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import './styles.scss';

function Header() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    navigate(SIGN_IN);
  }

  const redirect = path => {
    navigate(path);
    setDrawerOpen(false);
  }

  return (
    <div className='header-wrapper'>
      <Button className='menu-btn' onClick={() => setDrawerOpen(true)}>
        <MenuIcon color='#FFFFFF' />
      </Button>

      <div className='logo'>PWA-Reader</div>


      <Drawer className='drawer-wrapper' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Button onClick={() => redirect(HOME)}>
          <HomeIcon />
          Home
        </Button>
        <Button className='sign-out-btn' onClick={handleLogout}>
          <LogoutIcon />
          Sign out
        </Button>
      </Drawer>
    </div>
  );
}

export default Header;
