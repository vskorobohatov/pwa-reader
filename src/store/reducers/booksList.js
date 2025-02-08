import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    bookFiltersState: false,
    sortBy: "updatedAt",
    sortDirection: "desc",
    isLoading: true
  },
  reducers: {
    setBookFiltersState: (state, action) => {
      state.bookFiltersState = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setBooksLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setSortBy, setSortDirection, setBookFiltersState, setBooks, setBooksLoading } = uiSlice.actions;

export default uiSlice.reducer;