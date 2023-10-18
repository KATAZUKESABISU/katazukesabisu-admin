import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Iconify } from '../iconify';
import { styled } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialogTile = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  justifyContent: 'start',
  alignItems: 'center',
  padding: theme.spacing(3, 2, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2),
  '&.MuiDialogContent-root': {
    paddingTop: theme.spacing(2),
  },
}));

interface ConfirmDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => Promise<void>;
}

export default function DialogConfirmDelete({ isOpen, handleClose, handleConfirm }: ConfirmDialogProps) {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="dialog-description"
    >
      <StyledDialogTile>
        <Iconify icon="material-symbols:delete-outline" /> Delete this Blog?
      </StyledDialogTile>
      <StyledDialogContent>
        <DialogContentText id="dialog-description">
          Are you sure you want to delete this blog? <br />
          This item will be deleted immediately. You can&apos;t undo this action.
        </DialogContentText>
      </StyledDialogContent>
      <DialogActions sx={{ padding: (theme) => theme.spacing(0, 2, 2) }}>
        <Button variant="contained" color="error" onClick={handleConfirm}>
          Delete
        </Button>
        <Button variant="outlined" color="inherit" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
