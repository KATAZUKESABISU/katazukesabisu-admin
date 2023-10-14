import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type LogoProps = {
  sx?: object;
  disabledLink?: boolean;
};

const Logo = ({ disabledLink = false, sx }: LogoProps) => {
  const logo = (
    <Box
      component="img"
      src="/assets/icons/clean-logo.svg"
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link
      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}
      underline="none"
      to="/"
      component={RouterLink}
    >
      {logo}
      <Typography variant="h5" sx={{ textTransform: 'uppercase' }}>
        katazukesabisu
      </Typography>
    </Link>
  );
};

export default Logo;
