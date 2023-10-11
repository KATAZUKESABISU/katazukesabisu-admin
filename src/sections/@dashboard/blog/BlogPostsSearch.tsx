import React from 'react';

// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { InputAdornment, OutlinedInput } from '@mui/material';
// components
import { Iconify } from '../../../components/iconify';
import { Theme } from '../../../interface';

// ----------------------------------------------------------------------

const StyledSearch = styled(OutlinedInput)(({ theme }: { theme: Theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: `0 8px 16px 0 ${alpha(theme.palette.grey[500], 0.16)}`,
    '& fieldset': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

interface BlogPost {
  filterName?: string;
  onFilterName?: () => void;
}

export default function BlogPostsSearch({ filterName = '', onFilterName = () => {} }: BlogPost) {
  const theme: Theme = useTheme();

  return (
    <StyledSearch
      theme={theme}
      value={filterName}
      onChange={onFilterName}
      placeholder="Search post..."
      startAdornment={
        <InputAdornment position="start">
          <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
        </InputAdornment>
      }
    />
  );
}
