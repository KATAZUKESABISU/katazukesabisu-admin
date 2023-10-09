import React from 'react';

// @mui
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

interface BlogPostsSortProps {
  options: {
    value: string;
    label: string;
  }[];
  onSort?: () => void;
}

export default function BlogPostsSort({ options, onSort }: BlogPostsSortProps) {
  return (
    <TextField select size="small" value="latest" onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
