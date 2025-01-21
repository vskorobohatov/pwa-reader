import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Drawer } from '@mui/material';

import { getSavedValue, saveValue } from 'helpers/ui';
import { BOOK_FILTERS_STORAGE_KEY } from 'storageVariables';
import { sortByOptions, sortDirOptions } from 'helpers/selectOptions';
import { setBookFiltersState, setSortBy, setSortDirection } from "store/reducers/booksList";

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
      options: sortByOptions,
      value: sortBy,
      onChange: val => {
        dispatch(setSortBy(val));
        saveValue(BOOK_FILTERS_STORAGE_KEY, { sortBy: val, sortDirection });
      },
    },
    {
      label: "Sort Direction",
      options: sortDirOptions,
      value: sortDirection,
      onChange: val => {
        dispatch(setSortDirection(val));
        saveValue(BOOK_FILTERS_STORAGE_KEY, { sortBy, sortDirection: val });
      },
    },
  ];

  useEffect(() => {
    getSavedFilters();
  }, []);

  const getSavedFilters = () => {
    const filters = getSavedValue(BOOK_FILTERS_STORAGE_KEY);
    if (filters?.sortBy && filters?.sortDirection) {
      dispatch(setSortBy(filters.sortBy));
      dispatch(setSortDirection(filters.sortDirection));
    }
  }

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
