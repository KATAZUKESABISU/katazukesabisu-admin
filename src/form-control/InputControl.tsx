import React, { useCallback, useEffect, useState } from 'react';
import { useFormContext, Controller, FieldValues } from 'react-hook-form';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import { Iconify } from '../components/iconify';

interface InputControlProps {
  label: string;
  name: string;
  initValue?: string;
  type?: 'password' | 'text';
}

const InputControl = ({ label, name, initValue = '', type = 'text' }: InputControlProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (initValue) {
      setValue(name, initValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValue]);

  const renderInput = useCallback(
    ({ field }: { field: FieldValues }) => {
      if (type === 'text') {
        return (
          <TextField
            inputProps={{ ...field }}
            error={Boolean(errors[name])}
            sx={{
              '&>.Mui-error>input': { background: '#FFF2F7' },
            }}
            helperText={errors[name]?.message as string}
            label={label}
          />
        );
      }

      return (
        <TextField
          name={name}
          label={label}
          sx={{
            '&>.Mui-error>input': { background: '#FFF2F7' },
          }}
          type={showPassword ? 'text' : 'password'}
          error={Boolean(errors[name])}
          helperText={errors[name]?.message as string}
          inputProps={{ ...field }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showPassword, errors]
  );

  return (
    <React.Fragment>
      <Controller name={name} control={control} render={renderInput} />
    </React.Fragment>
  );
};

export default InputControl;
