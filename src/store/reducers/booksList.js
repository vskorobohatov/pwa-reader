import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'books',
  initialState: {
    bookFiltersState: false,
    sortBy: "updatedAt",
    sortDirection: "desc"
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
  },
});

// Action creators are generated for each case reducer function
export const { setSortBy, setSortDirection, setBookFiltersState } = uiSlice.actions;

export default uiSlice.reducer;