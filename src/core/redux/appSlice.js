import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    currency: JSON.parse(localStorage.getItem('currency')) || null,
    currencies: [],
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
      localStorage.setItem('currency', JSON.stringify(action.payload));
    },
    setCurrencies: (state, action) => {
      state.currencies = action.payload;
    },
  },
});

const { actions, reducer } = appSlice;

export const { setCurrency, setCurrencies } = actions;
export default reducer;
