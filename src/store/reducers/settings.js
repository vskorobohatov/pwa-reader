import { createSlice } from '@reduxjs/toolkit'
import { defaultSettings } from 'helpers/defaults';
import { saveValue } from 'helpers/ui';
import { SETTINGS_STORAGE_KEY } from 'storageVariables';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    values: defaultSettings
  },
  reducers: {
    setSettings: (state, action) => {
      const newValues = { ...state.values, ...action.payload };
      saveValue(SETTINGS_STORAGE_KEY, newValues);
      state.values = newValues;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
