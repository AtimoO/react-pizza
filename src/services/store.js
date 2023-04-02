import { configureStore } from '@reduxjs/toolkit';
import sort from './slices/sortSlice';

export const store = configureStore({
  reducer: {
    sort,
  },
});
