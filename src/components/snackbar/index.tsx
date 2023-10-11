import * as React from 'react';
import Stack from '@mui/material/Stack';
import { default as MuiSnackbar } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';

import { useAppSelector, useAppDispatch } from 'src/store/hook';
import { closeSnackbar } from 'src/store/snackbar';

type TransitionProps = Omit<SlideProps, 'direction'>;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

export default function Snackbar() {
  const dispatch = useAppDispatch();
  const { isDisplay, message, severity } = useAppSelector((state) => state.snackbar);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeSnackbar());
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <MuiSnackbar open={isDisplay} autoHideDuration={6000} TransitionComponent={TransitionLeft} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%', typography: 'body2' }}>
          {message}
        </Alert>
      </MuiSnackbar>
    </Stack>
  );
}
