import React, { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, FormProvider, useForm, Resolver } from 'react-hook-form';

// Validate
import { object, ValidationError, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { Link, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import InputControl from 'src/components/form-control/InputControl';
import CheckboxControl from 'src/components/form-control/CheckboxControl';

// Hook
import { useAppDispatch } from 'src/store/hook';
import { login } from 'src/store/auth';

import { URL_MAPPING } from 'src/routes/urlMapping';
import { openSnackbar } from 'src/store/snackbar';
import { AbstractResponse } from 'src/api/utils';
import { CheckboxValue } from 'src/utils/constants';

import message from 'src/lang/en.json';

// ----------------------------------------------------------------------

const LOGIN_OPTION = [{ label: 'Remember me', value: CheckboxValue.Checked }];

interface FormData extends FieldValues {
  username: string;
  password: string;
  remember: string[];
}

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const validationSchema = object<FormData>().shape({
    username: string().min(4).max(100).required(message['validate.required']),
    password: string().required(message['validate.required']),
  });

  const formConfig = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
      remember: [],
    },
    resolver: yupResolver(validationSchema) as unknown as Resolver<FormData>,
  });

  const { getValues, clearErrors, setError } = formConfig;

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (loading) {
        return;
      }

      setLoading(true);
      clearErrors();

      const { username, password, remember } = getValues();
      await validationSchema.validate({ username, password }, { abortEarly: false });
      const resp = await dispatch(login({ username, password, remember: remember[0] ? '1' : '' }));

      if (resp.type.endsWith('fulfilled')) {
        navigate(URL_MAPPING.ROOT, { replace: true });
      }
    } catch (e) {
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
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <FormProvider {...formConfig}>
        <Stack spacing={3}>
          <InputControl label="Username" name="username" />
          <InputControl label="Password" name="password" type="password" />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <CheckboxControl name="remember" options={LOGIN_OPTION} />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
          Login
        </LoadingButton>
      </FormProvider>
    </form>
  );
}
