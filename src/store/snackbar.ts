import { createSlice } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material/Alert';

export interface SnackbarProps {
  isDisplay: boolean;
  message: string;
  severity?: AlertColor;
}

const initialState: SnackbarProps = {
  isDisplay: false,
  message: '',
  severity: undefined,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar(state, action: { payload: Omit<SnackbarProps, 'isDisplay'> }) {
      const { message, severity } = action.payload;
      state.isDisplay = true;
      state.message = message;
      state.severity = severity;
    },
    closeSnackbar(state) {
      state.isDisplay = false;
      state.message = '';
    },
  },
});

export const snackbar = snackbarSlice.reducer;

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
