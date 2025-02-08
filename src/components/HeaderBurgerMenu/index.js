import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';

import { ABOUT, BOOKS, SETTINGS, SIGN_IN } from 'pathnameVariables';
import { removeToken } from 'helpers/tokenHelper';
import { setMenuDrawerState } from "store/reducers/ui";

import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import './styles.scss';

export const mainMenuComponentKey = "booksFiltersComponent";

const HeaderBurgerMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { menuDrawerState } = useSelector(store => store.ui);

  const handleLogout = () => {
    dispatch(setMenuDrawerState(false));
    clearCache();
    removeToken();
    navigate(SIGN_IN);
  }

  const clearCache = async () => {
    const cache = await caches.open("books-cache");
    const keys = await cache.keys();
    await Promise.all(keys.map(request => cache.delete(request)));
  }

  const redirect = path => {
    navigate(path);
    dispatch(setMenuDrawerState(false));
  }

  const compareStrings = (str1, str2) => {
    const regex = /[^a-zA-Z0-9]/g;
    return str1.replace(regex, '').toLowerCase() === str2.replace(regex, '').toLowerCase();
  };

  const routes = [
    {
      label: "Library",
      icon: <MenuBookIcon />,
      isActive: compareStrings(pathname, BOOKS),
      onClick: () => redirect(BOOKS)
    },
    {
      label: "Settings",
      icon: <SettingsIcon />,
      isActive: compareStrings(pathname, SETTINGS),
      onClick: () => redirect(SETTINGS)
    },
    {
      label: "About",
      icon: <HelpIcon />,
      isActive: compareStrings(pathname, ABOUT),
      onClick: () => redirect(ABOUT)
    },
  ];

  return (
    <div className='header-menu-wrapper'>
      <Button className='header-menu-btn' onClick={() => dispatch(setMenuDrawerState(true))}>
        <MenuIcon />
      </Button>

      {routes.find(it => it.isActive)?.label}

      <Drawer className='drawer-wrapper menu' open={menuDrawerState} onClose={() => dispatch(setMenuDrawerState(false))}>
        <div className='logo'>
          PWA-Reader
          <Button onClick={() => dispatch(setMenuDrawerState(false))} className='close-btn'>
            <CloseIcon />
          </Button>
        </div>
        {routes.map(route => (
          <Button key={route.label} onClick={route.onClick} className={route.isActive ? "active" : ""}>
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

export default HeaderBurgerMenu;
