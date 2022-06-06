import { configureStore } from '@reduxjs/toolkit';
import reducer from './appSlice';

const store = () => {
  return configureStore({
    reducer: reducer,
  });
};

export default store;
