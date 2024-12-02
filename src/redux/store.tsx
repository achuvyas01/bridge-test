import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './slices/global.slice';
import sendSlice from './slices/send.slice';

export const store = configureStore({
  reducer: {
    global: globalSlice,
    send: sendSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
