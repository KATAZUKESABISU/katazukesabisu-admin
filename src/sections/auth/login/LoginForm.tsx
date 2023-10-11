import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

// Validate
import { object, ValidationError, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { Link, Stack, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import InputControl from 'src/components/form-control/InputControl';
// Hook
import { useAppDispatch } from 'src/store/hook';
import { login } from 'src/store/auth';

import { URL_MAPPING } from 'src/routes/urlMapping';
import { openSnackbar } from 'src/store/snackbar';
import { AbstractResponse } from 'src/api/utils';

// ----------------------------------------------------------------------

interface FormData extends FieldValues {
  username: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loading = useRef(false);

  const validationSchema = object<FormData>().shape({
    username: string().min(4).max(100).required(),
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
      const resp = await dispatch(login({ username, password }));

      if (resp.type.endsWith('fulfilled')) {
        navigate(URL_MAPPING.ROOT, { replace: true });
      }
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        e.inner.map((field) => {
          const fieldName = field.path ?? '';
          // Highlight Error and display error message
          setError(fieldName, field);
        });

        return;
      }

      dispatch(openSnackbar({ message: (e as AbstractResponse).message, severity: 'error' }));
    } finally {
      loading.current = false;
    }
  };

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
