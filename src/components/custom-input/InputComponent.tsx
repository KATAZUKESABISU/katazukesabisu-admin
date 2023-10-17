import React from 'react';
import { Input, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface InputProps {
  id: string;
  name: string;
  defaultValue: string;
  width?: number;
}

export default function InputComponent({ defaultValue, id, name, width = 300 }: InputProps): JSX.Element {
  const { register } = useFormContext();

  return (
    <TextField
      {...register(name)}
      id={id}
      name={name}
      error
      label="Editing"
      multiline
      // variant="standard"
      sx={{
        '& input.MuiInputBase-input': {
          minHeight: '100px',
        },
        minWidth: `100%`,
        backgroundColor: '#00AB55',
        borderRadius: '3px solid red',
        margin: '20px 0',
      }}
      defaultValue={defaultValue}
      // value={value}
    />
  );
}
