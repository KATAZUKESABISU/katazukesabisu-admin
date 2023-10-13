import { createSlice } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material/Alert';

export interface SnackbarProps {
  isDisplay: boolean;
  message: string;
  severity?: AlertColor;
}

interface UIProps {
  snackbar: SnackbarProps;
  loading: {
    isLoading: boolean;
  };
}

const initialState: UIProps = {
  snackbar: {
    isDisplay: false,
    message: '',
    severity: undefined,
  },
  loading: {
    isLoading: false,
  },
};

const uiSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar(state, action: { payload: Omit<SnackbarProps, 'isDisplay'> }) {
      state.snackbar = { ...action.payload, isDisplay: true };
    },
    closeSnackbar(state) {
      state.snackbar.isDisplay = false;
    },
    startLoading(state) {
      state.loading.isLoading = true;
    },
    endLoading(state) {
      state.loading.isLoading = false;
    },
  },
});

export const ui = uiSlice.reducer;

export const { openSnackbar, closeSnackbar, startLoading, endLoading } = uiSlice.actions;
