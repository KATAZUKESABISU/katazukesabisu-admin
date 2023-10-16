import React, { useLayoutEffect, FormEvent, useState, useEffect } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { useNavigate, Link as ReactLink, useLocation } from 'react-router-dom';

// Form
import { object, ValidationError, string } from 'yup';
import { FormProvider, useForm, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Box, Stack, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { useAppSelector, useAppDispatch } from 'src/store/hook';
// components
import { Iconify } from '../components/iconify';
// sections
import { Theme } from '../interface';
import { URL_MAPPING } from 'src/routes/urlMapping';
// Message
import message from 'src/lang/en.json';
import { openSnackbar } from 'src/store/ui';
import { AbstractResponse } from 'src/api/utils';
import InputControl from 'src/components/form-control/InputControl';
import InputVerifyCode from 'src/components/form-control/InputVerifyCode';

// ----------------------------------------------------------------------

const StyledRoot = styled('form')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledImage = styled('img')(() => ({
  width: '96px',
  height: '96px',
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const helmetData = new HelmetData({});
const INPUT_SIZE = 6;

interface FormData {
  email: string;
  code: string[];
  password: string;
  confirmPassword: string;
}

export default function NewPassword() {
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);

  const validationSchema = object<FormData>().shape({
    password: string().required(message['validate.required']),
    confirmPassword: string().required(message['validate.required']),
  });

  const formConfig = useForm<FormData>({
    defaultValues: {
      email: '',
      code: Array(INPUT_SIZE).fill(''),
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(validationSchema) as unknown as Resolver<FormData>,
  });

  const { getValues, clearErrors, setError, setValue } = formConfig;

  useLayoutEffect(() => {
    if (token) {
      navigate(URL_MAPPING.ROOT, { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (state === null) {
      navigate(URL_MAPPING.RESET_PASSWORD, { replace: true });
    }

    setValue('email', state.email);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (loading) {
        return;
      }

      setLoading(true);
      clearErrors();

      const { email } = getValues();
      await validationSchema.validate({ email }, { abortEarly: false });

      navigate(URL_MAPPING.NEW_PASSWORD);
    } catch (e) {
      if (e instanceof ValidationError) {
        setError('email', e);
        return;
      }

      dispatch(openSnackbar({ message: (e as AbstractResponse).message, severity: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Helmet helmetData={helmetData}>
        <title>New Password</title>
      </Helmet>

      <StyledRoot onSubmit={handleSubmit}>
        <FormProvider {...formConfig}>
          <Container maxWidth="sm">
            <StyledContent>
              <Stack mb={3} justifyContent="center" alignItems="center">
                <StyledImage src="/assets/icons/ic_password.svg" alt="login" />
              </Stack>

              <Stack mb={5} justifyContent="center" alignItems="center">
                <Typography variant="h3" gutterBottom>
                  Request sent successfully!
                </Typography>
                <Typography variant="body1" textAlign="center">
                  We have sent a 8-digit confirmation email to your email. Please enter the code in below box to verify
                  your email.
                </Typography>
              </Stack>

              <Stack gap={3}>
                <InputControl label="Email address" name="email" disabled />
                <InputVerifyCode name="code" size={INPUT_SIZE} />
                <InputControl label="Password" name="password" />
                <InputControl label="Confirm New Password" name="confirmPassword" />
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
                  Update Password
                </LoadingButton>
                <Box display="flex" alignItems="center" justifyContent="center" gap="6px">
                  Don’t have a code?
                  <Link
                    underline="hover"
                    component={ReactLink}
                    variant="body1"
                    textAlign="center"
                    to={URL_MAPPING.LOGIN}
                  >
                    Resend code
                  </Link>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center" gap="4px">
                  <Iconify icon="grommet-icons:form-previous" color="inherit" />
                  <Link
                    underline="hover"
                    component={ReactLink}
                    variant="body1"
                    textAlign="center"
                    to={URL_MAPPING.LOGIN}
                    paddingRight="28px"
                    color="inherit"
                  >
                    Return to sign in
                  </Link>
                </Box>
              </Stack>
            </StyledContent>
          </Container>
        </FormProvider>
      </StyledRoot>
    </React.Fragment>
  );
}
