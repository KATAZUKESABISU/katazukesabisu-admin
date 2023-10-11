import { configureStore } from '@reduxjs/toolkit';

// Custom store
import { auth } from './auth';
import { snackbar } from './snackbar';

const store = configureStore({
  reducer: {
    auth,
    snackbar,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
