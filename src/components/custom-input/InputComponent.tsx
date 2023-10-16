import React from 'react';
import { Input, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface InputProps {
  id: string;
  name: string;
  onChange: (e: unknown) => void;
  defaultValue: string;
}

export default function InputComponent({ onChange, defaultValue, id, name }: InputProps): JSX.Element {
  const { register } = useFormContext();

  return (
    <TextField
      {...register(name)}
      id={id}
      name={name}
      label="Standard"
      variant="standard"
      sx={{ minWidth: '500px', backgroundColor: '#666' }}
      onChange={onChange}
      defaultValue={defaultValue}
      // value={value}
    />
  );
}
