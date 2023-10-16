import React, { useLayoutEffect, useState, FormEvent } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { useNavigate, Link as ReactLink } from 'react-router-dom';

// Validate
import { object, ValidationError, string } from 'yup';
import { FormProvider, useForm, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, Box, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import { Iconify } from 'src/components/iconify';
import InputControl from 'src/components/form-control/InputControl';

// hooks
import { useAppSelector, useAppDispatch } from 'src/store/hook';
import { openSnackbar } from 'src/store/ui';
import { postForgetPassword } from 'src/api/auth';

// sections
import { URL_MAPPING } from 'src/routes/urlMapping';

// Message
import message from 'src/lang/en.json';
import { AbstractResponse } from 'src/api/utils';

// ----------------------------------------------------------------------

const StyledForm = styled('form')(({ theme }) => ({
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

interface FormData {
  email: string;
}

export default function ResetPassword() {
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const validationSchema = object<FormData>().shape({
    email: string().required(message['validate.required']).email(message['validate.email']),
  });

  const formConfig = useForm<FormData>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(validationSchema) as unknown as Resolver<FormData>,
  });

  const { getValues, clearErrors, setError } = formConfig;

  useLayoutEffect(() => {
    if (token) {
      navigate(URL_MAPPING.ROOT, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
      await postForgetPassword({ email });
      navigate(URL_MAPPING.NEW_PASSWORD, {
        state: {
          email,
        },
      });
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
        <title>Reset password</title>
      </Helmet>

      <StyledForm onSubmit={handleSubmit}>
        <FormProvider {...formConfig}>
          <Container maxWidth="sm">
            <StyledContent>
              <Stack mb={3} justifyContent="center" alignItems="center">
                <StyledImage src="/assets/icons/ic_password.svg" alt="login" />
              </Stack>

              <Stack mb={5} justifyContent="center" alignItems="center">
                <Typography variant="h3" gutterBottom>
                  Forgot your password?
                </Typography>
                <Typography variant="body1" textAlign="center">
                  Please enter the email address associated with your account, and we will email you a link to reset
                  your password.
                </Typography>
              </Stack>

              <Stack gap={3}>
                <InputControl label="Email address" name="email" />
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
                  Reset Password
                </LoadingButton>
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
      </StyledForm>
    </React.Fragment>
  );
}
