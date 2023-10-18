import React, { useCallback, useMemo } from 'react';
import { Input, TextField } from '@mui/material';
import { useFormContext, Controller, FieldValues } from 'react-hook-form';

interface InputProps {
  id: string;
  name: string;
  defaultValue: string;
  width?: number;
}

export default function InputComponent({ defaultValue, id, name, width = 300 }: InputProps): JSX.Element {
  const { register, control } = useFormContext();

  const renderInput = useCallback(({ field }: { field: FieldValues }) => {
    console.log('fields', field);
    console.log('name', name);
    return (
      <>
        <TextField
          // {...register(name)}
          {...field}
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
      </>
    );
  }, []);

  return <Controller name={name} control={control} render={(props) => renderInput(props)} />;
}
