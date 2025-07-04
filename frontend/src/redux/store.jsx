import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});