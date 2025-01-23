import React from 'react';
import { useSelector } from 'react-redux';

import HeaderBurgerMenu from 'components/HeaderBurgerMenu';
import BooksFiltersComponent, { booksFiltersComponentKey } from 'components/BooksFilters';

import './styles.scss';

const sideComponents = {
  [booksFiltersComponentKey]: BooksFiltersComponent
};

const Header = () => {
  const { headerSideComponent, showHeader } = useSelector(store => store.ui);
  console.log(showHeader)
  if (!showHeader) {
    return null;
  }

  const SideComponent = sideComponents[headerSideComponent] || null;

  return (
    <div className="header-wrapper">
      <HeaderBurgerMenu />

      {!!SideComponent ? <SideComponent /> : null}
    </div>
  );
}

export default Header;
