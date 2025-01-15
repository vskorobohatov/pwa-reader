import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';

import { ABOUT, BOOKS, SETTINGS, SIGN_IN } from 'pathnameVariables';
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
  const { pathname } = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    navigate(SIGN_IN);
  }

  const redirect = path => {
    navigate(path);
    setDrawerOpen(false);
  }

  const routes = [
    {
      label: "Home",
      icon: <HomeIcon />,
      isActive: pathname === BOOKS,
      onClick: () => redirect(BOOKS)
    },
    {
      label: "Settings",
      icon: <SettingsIcon />,
      isActive: pathname === SETTINGS,
      onClick: () => redirect(SETTINGS)
    },
    {
      label: "About",
      icon: <HelpIcon />,
      isActive: pathname === ABOUT,
      onClick: () => redirect(ABOUT)
    },
  ]

  if (!!bookId) {
    return null;
  }

  return (
    <div className="header-wrapper">
      <Button className='menu-btn' onClick={() => setDrawerOpen(true)}>
        <MenuIcon color='#FFFFFF' />
      </Button>

      <Drawer className='drawer-wrapper' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className='logo'>PWA-Reader</div>
        {routes.map(route => (
          <Button onClick={route.onClick} className={route.isActive ? "active" : ""}>
            {route.icon}
            {route.label}
          </Button>
        ))}
        <Button className='sign-out-btn' onClick={handleLogout}>
          <LogoutIcon />
          Sign out
        </Button>
      </Drawer>
    </div>
  );
}

export default Header;
