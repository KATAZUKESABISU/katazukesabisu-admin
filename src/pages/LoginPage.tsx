import React, { useLayoutEffect } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hook/useResponsive';
import { useAppSelector, useAppDispatch } from 'src/store/hook';
// components
import { Logo } from '../components/logo';
import { Iconify } from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import { Theme } from '../interface';
import { URL_MAPPING } from 'src/routes/urlMapping';
// Message
import message from 'src/lang/en.json';
import { openSnackbar } from 'src/store/ui';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const helmetData = new HelmetData({});

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const theme: Theme = useTheme();
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (token) {
      navigate(URL_MAPPING.ROOT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const showMaintainMessage = () => {
    dispatch(openSnackbar({ message: message['notice.maintain'], severity: 'warning' }));
  };

  return (
    <React.Fragment>
      <Helmet helmetData={helmetData}>
        <title> Login | かたづけサービス </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection theme={theme}>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Logo
              fontSize="2rem !important"
              sx={{
                gap: theme.spacing(2),
                justifyContent: 'center',
                marginBottom: theme.spacing(3),
                color: 'CaptionText',
              }}
            />
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined" onClick={showMaintainMessage}>
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined" onClick={showMaintainMessage}>
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined" onClick={showMaintainMessage}>
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </React.Fragment>
  );
}
