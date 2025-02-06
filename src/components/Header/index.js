import React from 'react';
import { useSelector } from 'react-redux';

import HeaderBurgerMenu from 'components/HeaderBurgerMenu';
import AddBookComponent, { addBookComponentKey } from 'components/AddBookComponent';
import SaveSettingsButton, { resetSettingsButtonKey } from 'components/ResetSettingsButton';

import './styles.scss';

const sideComponents = {
  [addBookComponentKey]: AddBookComponent,
  [resetSettingsButtonKey]: SaveSettingsButton,
};

const Header = () => {
  const { headerSideComponent, headerSideComponentProps, showHeader } = useSelector(store => store.ui);

  if (!showHeader) {
    return null;
  }

  const SideComponent = sideComponents[headerSideComponent] || null;

  return (
    <div className="header-wrapper">
      <div className="header-content">
        <HeaderBurgerMenu />

        {!!SideComponent ? <SideComponent {...headerSideComponentProps} /> : null}
      </div>
    </div>
  );
}

export default Header;
