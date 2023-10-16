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
      error
      label="Editing"
      // variant="standard"
      sx={{ minWidth: '500px', backgroundColor: '#00AB55', borderRadius: '3px solid red', margin: '20px 0' }}
      onChange={onChange}
      defaultValue={defaultValue}
      // value={value}
    />
  );
}
