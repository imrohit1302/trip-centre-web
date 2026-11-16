import { configureStore } from '@reduxjs/toolkit';
import { webApi } from './api/webApi';

export const store = configureStore({
  reducer: {
    [webApi.reducerPath]: webApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
