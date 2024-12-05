import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';

import { ABOUT, HOME, SETTINGS, SIGN_IN } from 'pathnameVariables';
import { removeToken } from 'helpers/tokenHelper';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import './styles.scss';

function Header() {
  const { bookId } = useParams();
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
    <div className={`header-wrapper ${!!bookId ? "compact" : ""}`}>
      <Button className='menu-btn' onClick={() => setDrawerOpen(true)}>
        <MenuIcon color='#FFFFFF' />
      </Button>

      <Drawer className='drawer-wrapper' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className='logo'>PWA-Reader</div>
        <Button onClick={() => redirect(HOME)}>
          <HomeIcon />
          Home
        </Button>
        <Button onClick={() => redirect(SETTINGS)}>
          <SettingsIcon />
          Settings
        </Button>
        <Button onClick={() => redirect(ABOUT)}>
          <HelpIcon />
          About
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
