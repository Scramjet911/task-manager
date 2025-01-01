// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import ticketSlice from './slices/ticketsSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    tickets: ticketSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
