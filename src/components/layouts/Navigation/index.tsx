import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';

import useResponsive from '../../../hook/useResponsive';
import Scrollbar from '../../../components/scrollbar';

import { navConfig } from 'src/routes/urlMapping';
import { Logo } from '../../logo';
import NavSection from '../../nav-section/NavSection';
import { useAppSelector } from 'src/store/hook';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  border: '1px dashed rgba(145, 158, 171, 0.24)',
}));

const StyledCover = styled('img')({
  objectFit: 'cover',
  width: 'auto',
  height: '200px',
});

// ----------------------------------------------------------------------

type NavigationProps = {
  openNav: boolean;
  onCloseNav: () => void;
};

export default function Navigation({ openNav, onCloseNav }: NavigationProps) {
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box
        sx={{
          backgroundColor: 'transparent',
          px: 2.5,
          py: 3,
          display: 'inline-flex',
        }}
      >
        <Logo />
      </Box>

      <Box
        sx={{
          backgroundColor: 'transparent',
          mb: 5,
          mx: 2.5,
        }}
      >
        <Link underline="none">
          <StyledAccount>
            <Avatar src={user.photoUrl} alt="photoUrl" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {user.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {user.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      <Box
        sx={{
          backgroundColor: 'transparent',
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledCover src={'/assets/illustrations/illustrations_nav_footer.svg'} alt="Cover image" />
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
        backgroundColor: 'transparent',
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              borderRightStyle: 'dashed',
              backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
              backdropFilter: 'blur(135px)',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
