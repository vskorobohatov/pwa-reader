import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';

import { ABOUT, BOOKS, SETTINGS, SIGN_IN } from 'pathnameVariables';
import { removeToken } from 'helpers/tokenHelper';
import { setMenuDrawerState } from "store/reducers/ui";

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import './styles.scss';

export const mainMenuComponentKey = "booksFiltersComponent";

const HeaderBurgerMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { menuDrawerState } = useSelector(store => store.ui);

  const handleLogout = () => {
    removeToken();
    navigate(SIGN_IN);
  }

  const redirect = path => {
    navigate(path);
    dispatch(setMenuDrawerState(false));
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
  ];

  return (
    <div className='header-menu-wrapper'>
      <Button className='header-menu-btn' onClick={() => dispatch(setMenuDrawerState(true))}>
        <MenuIcon />
      </Button>

      <Drawer className='drawer-wrapper menu' open={menuDrawerState} onClose={() => dispatch(setMenuDrawerState(false))}>
        <div className='logo'>PWA-Reader</div>
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
