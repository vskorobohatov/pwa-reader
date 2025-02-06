import { createSlice } from '@reduxjs/toolkit'
import { defaultSettings } from 'helpers/defaults';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    values: defaultSettings
  },
  reducers: {
    setSettings: (state, action) => {
      state.values = {...state.values, ...action.payload};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
