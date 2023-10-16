import { configureStore } from '@reduxjs/toolkit';

// Custom store
import { auth } from './auth';
import { ui } from './ui';
import { contactUs } from './contactUs';

const store = configureStore({
  reducer: {
    auth,
    ui,
    contactUs,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
