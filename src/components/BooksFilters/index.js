import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Drawer } from '@mui/material';

import { setBookFiltersState, setSortBy, setSortDirection } from "store/reducers/booksList";
import { sortByOptions, sortDirOptions } from 'helpers/selectOptions';

import StyledSelect from 'components/StyledSelect';

import FilterListIcon from '@mui/icons-material/FilterList';

import './styles.scss';

export const booksFiltersComponentKey = "booksFiltersComponent";

const BooksFiltersComponent = () => {
  const dispatch = useDispatch();
  const { bookFiltersState, sortBy, sortDirection } = useSelector(store => store.booksList);

  const bookFilters = [
    {
      label: "Sort By",
      value: sortBy,
      onChange: val => dispatch(setSortBy(val)),
      options: sortByOptions
    },
    {
      label: "Sort Direction",
      value: sortDirection,
      onChange: val => dispatch(setSortDirection(val)),
      options: sortDirOptions
    },
  ];

  return (
    <div className='books-filters-wrapper'>
      <Button className='books-filter-btn' onClick={() => dispatch(setBookFiltersState(true))}>
        <FilterListIcon />
      </Button>
      <Drawer anchor='right' className='drawer-wrapper' open={bookFiltersState} onClose={() => dispatch(setBookFiltersState(false))}>
        {bookFilters.map((filterData, i) => <StyledSelect key={`filter-${i}`} {...filterData} />)}
      </Drawer>
    </div>
  );
}

export default BooksFiltersComponent;
