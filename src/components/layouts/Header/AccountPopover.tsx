import React, { useState, MouseEvent } from 'react';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, useTheme } from '@mui/material';

import { Theme } from '../../../interface';
import useAuth from '../../../hook/useAuth';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  // ----------- React Hook ------------------
  const theme: Theme = useTheme();
  const { logout, user } = useAuth();

  // ----------- State declare ---------------
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  // ----------- Handle change state ---------------
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    setOpen(null);
    logout();
  }

  return (
    <React.Fragment>
      <IconButton onClick={handleOpen} sx={{ p: 0 }}>
        <Avatar src={user.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 220,
            boxShadow: theme.customShadows.dropdown,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, pl: 2.5, pr: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {user.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </React.Fragment>
  );
}
