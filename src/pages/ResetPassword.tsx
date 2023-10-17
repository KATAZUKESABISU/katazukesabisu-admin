import React, { useLayoutEffect, useState, FormEvent } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { useNavigate, Link as ReactLink } from 'react-router-dom';

// Validate
import { object, ValidationError, string } from 'yup';
import { FormProvider, useForm, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { alpha, styled } from '@mui/material/styles';
import { Typography, Stack, Box, Link, Paper } from '@mui/material';
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

// ----------------------------------------------------------------------

const StyledForm = styled('form')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'center/cover no-repeat url("/assets/Trees sprouted.jpg")',
    zIndex: '-1',
    backgroundBlendMode: 'difference',
    opacity: theme.palette.mode === 'dark' ? 0.5 : 1,
  },
  display: 'flex',
  height: '100%',
}));

const StyledContainer = styled(Paper)(({ theme }) => ({
  margin: 'auto',
  backgroundImage: 'none',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '16px',
  zIndex: 0,
  padding: '40px 24px',
  maxWidth: '420px',
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
  backdropFilter: 'blur(135px)',
}));

const StyledImage = styled('img')(() => ({
  width: '96px',
  height: '96px',
}));

const StyledContent = styled('div')(() => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
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

      dispatch(openSnackbar({ message: (e as Error).message, severity: 'error' }));
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
          <StyledContainer>
            <StyledContent>
              <Stack mb={3} justifyContent="center" alignItems="center">
                <StyledImage src="/assets/icons/ic_password.svg" alt="login"></StyledImage>
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
          </StyledContainer>
        </FormProvider>
      </StyledForm>
    </React.Fragment>
  );
}
