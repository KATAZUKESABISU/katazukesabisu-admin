import React from 'react';
import { CircularProgress, Box, styled, alpha } from '@mui/material';

const StyledLoading = styled(Box)({
  position: 'fixed',
  top: '0',
  right: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha('#000', 0.2),
  zIndex: 20001,
  '& img': {
    width: 'auto',
    height: '80px',
  },
  '& .circleProgress': {
    position: 'absolute',
    left: 7,
    right: 0,
    top: 'calc(50% - 25px)',
  },
});

const Loading = () => {
  return (
    <StyledLoading
      sx={(theme) => ({
        [theme.breakpoints.up('lg')]: {
          width: `calc(100% - 280px)`,
        },
      })}
    >
      <Box position="relative">
        <CircularProgress className="circleProgress" />
      </Box>
    </StyledLoading>
  );
};

export default Loading;
