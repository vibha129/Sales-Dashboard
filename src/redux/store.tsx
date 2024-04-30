import { configureStore } from '@reduxjs/toolkit';
import salesDataSlice from './slice/salesDataSlice';


export const store = configureStore({
  reducer: {
    sale_data: salesDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;