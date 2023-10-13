import React from 'react';
import { CircularProgress, Box, styled, alpha, Theme } from '@mui/material';

import { RootState } from 'src/store';
import { useAppSelector } from 'src/store/hook';

const StyledLoading = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha('#000', 0.2),
  '& img': {
    width: 'auto',
    height: '25px',
  },
  '& .circleProgress': {
    position: 'absolute',
    left: -7,
    right: 0,
    top: 'calc(50% - 25px)',
  },
}));

const Loading = () => {
  return (
    <StyledLoading>
      <Box position="relative">
        <img src="/assets/images/logo-circle.svg" alt="" />
        <CircularProgress className="circleProgress" />
      </Box>
    </StyledLoading>
  );
};

export default Loading;
