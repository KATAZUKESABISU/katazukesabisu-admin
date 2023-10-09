import { Theme } from '../../interface';

// ----------------------------------------------------------------------

export default function Paper(theme: Theme) {
  return {
    MuiPaper: {
      defaultProps: {
        // elevation: theme.customShadows.card,
        sx: { boxShadow: theme.customShadows.card },
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  };
}
