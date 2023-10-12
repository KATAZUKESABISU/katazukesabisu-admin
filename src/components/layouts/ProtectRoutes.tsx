import React, { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// Component
import Header from './Header';
import Nav from './Navigation';
import Loading from '../loading';

// Redux
import { useAppSelector } from 'src/store/hook';

// Utils
import { URL_MAPPING } from 'src/routes/urlMapping';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function ProtectRoutes() {
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const { token, initialized } = useAppSelector((state) => state.auth);

  if (!initialized) {
    return <Loading />;
  }

  if (!token) {
    return <Navigate replace to={URL_MAPPING.LOGIN} state={{ from: pathname }} />;
  }

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
