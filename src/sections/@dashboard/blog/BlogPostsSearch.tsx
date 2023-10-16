import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material';
// components
import { Iconify } from 'src/components/iconify';
import { Theme } from 'src/interface';

// ----------------------------------------------------------------------

const StyledSearch = styled(OutlinedInput)(({ theme }: { theme: Theme }) => ({
  width: 430,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    boxShadow: `0 8px 16px 0 ${alpha(theme.palette.grey[500], 0.16)}`,
    '& fieldset': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

// ----------------------------------------------------------------------

interface BlogPost extends OutlinedInputProps {
  name: string;
}

export default function BlogPostsSearch({ name, ...other }: BlogPost) {
  const theme: Theme = useTheme();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { name, onBlur, onChange, ref, value } }) => (
        <StyledSearch
          {...other}
          ref={ref}
          name={name}
          theme={theme}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Search post..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}
    />
  );
}
