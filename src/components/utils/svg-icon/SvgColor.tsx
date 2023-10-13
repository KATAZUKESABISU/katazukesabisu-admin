import React from 'react';

import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface SvgColorProps extends BoxProps {
  sx?: object;
  src: string;
  color?: string;
}

export default function SvgColor({ src, sx = {}, ...other }: SvgColorProps): JSX.Element {
  return (
    <React.Fragment>
      <Box
        {...other}
        component="span"
        sx={{
          width: 24,
          height: 24,
          display: 'inline-block',
          bgcolor: 'currentColor',
          mask: `url(${src}) no-repeat center / contain`,
          WebkitMask: `url(${src}) no-repeat center / contain`,
          ...sx,
        }}
      />
    </React.Fragment>
  );
}
