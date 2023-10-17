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
});

interface LoadingProps {
  fullWidth?: boolean;
}

const Loading = ({ fullWidth = false }: LoadingProps) => {
  return (
    <StyledLoading
      sx={(theme) => ({
        [theme.breakpoints.up('lg')]: {
          ...(!fullWidth && {
            width: `calc(100% - 280px)`,
          }),
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
