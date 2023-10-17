import React, { useLayoutEffect } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button, Box, Paper } from '@mui/material';
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

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'center/cover no-repeat url("/assets/Trees sprouted.jpg")',
    zIndex: '-1',
    backgroundBlendMode: 'difference',
    opacity: theme.palette.mode === 'dark' ? 0.5 : 1,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const StyledForm = styled(Paper)(({ theme }) => ({
  margin: 'auto',
  backgroundImage: 'none',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '16px',
  zIndex: 0,
  padding: theme.spacing(6, 3),
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
  backdropFilter: 'blur(135px)',
}));

const StyledSection = styled('div')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  maxWidth: 500,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),

  [theme.breakpoints.down('lg')]: {
    margin: 'auto',
    borderRadius: '16px',
    backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
    backdropFilter: 'blur(135px)',
  },
}));

const StyledContent = styled('div')(() => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

const helmetData = new HelmetData({});

export default function LoginPage() {
  const upLg = useResponsive('up', 'lg');
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

      <StyledContainer>
        <StyledSection theme={theme}>
          <Typography variant="h3" sx={{ mt: 2, mb: 4 }} gutterBottom>
            Sign in to Katazukesabisu
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
        </StyledSection>

        {upLg && (
          <StyledForm>
            <StyledContent>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Hi, Welcome Back
              </Typography>
              <img src="/assets/illustrations/illustration_dashboard.png" alt="login" />
            </StyledContent>
          </StyledForm>
        )}
      </StyledContainer>
    </React.Fragment>
  );
}
