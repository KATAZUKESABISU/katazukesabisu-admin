import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
// Validate
import { mixed, object, ValidationError, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { Link, Stack, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
// Hook
import useAuth from '../../../hook/useAuth';
import InputControl from '../../../form-control/InputControl';

// ----------------------------------------------------------------------

interface FormData extends FieldValues {
  username: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const loading = useRef(false);

  const validationSchema = object<FormData>().shape({
    username: string().min(8).max(100).required(),
    password: string().required(),
  });

  const formConfig = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const { getValues, clearErrors, setError } = formConfig;

  const handleClick = async () => {
    if (loading.current) {
      return;
    }
    loading.current = true;
    clearErrors();

    try {
      const { username, password } = getValues();
      await validationSchema.validate({ username, password }, { abortEarly: false });
      await login(username, password);
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        e.inner.map((field) => {
          const fieldName = field.path ?? '';
          // Highlight Error and display error message
          setError(fieldName, field);
        });
      }

      console.log(e);
    } finally {
      loading.current = false;
    }

    // navigate('/dashboard', { replace: true });
  };

  console.log('outside', loading.current);

  return (
    <FormProvider {...formConfig}>
      <Stack spacing={3}>
        <InputControl label="Username" name="username" />
        <InputControl label="Password" name="password" type="password" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormControlLabel control={<Checkbox name="remember" />} label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" variant="contained" loading={loading.current} onClick={handleClick}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
