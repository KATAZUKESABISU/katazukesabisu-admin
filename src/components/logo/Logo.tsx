import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, Typography, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  fontSize?: string;
}

const Logo = ({ disabledLink = false, fontSize, sx }: LogoProps) => {
  const logo = (
    <Box
      component="img"
      src="/assets/icons/clean-logo.svg"
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
      }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link
      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', ...sx }}
      underline="none"
      to="/"
      component={RouterLink}
    >
      {logo}

      <Typography variant="h5" sx={{ textTransform: 'uppercase', fontSize }}>
        katazukesabisu
      </Typography>
    </Link>
  );
};

export default Logo;
