import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: localStorage.getItem("theme") || "system",
    menuDrawerState: false,
    headerSideComponent: null,
    headerSideComponentProps: null,
    showHeader: true
  },
  reducers: {
    setMenuDrawerState: (state, action) => {
      state.menuDrawerState = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setShowHeader: (state, action) => {
      state.showHeader = action.payload;
    },
    setHeaderSideComponent: (state, action) => {
      state.headerSideComponent = action.payload;
    },
    setHeaderSideComponentProps: (state, action) => {
      state.headerSideComponentProps = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenuDrawerState, setTheme, setHeaderSideComponent, setHeaderSideComponentProps, setShowHeader } = uiSlice.actions;

export default uiSlice.reducer;
