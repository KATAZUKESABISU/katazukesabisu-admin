import React from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';

// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';

// components
import { Iconify } from '../components/iconify';

// mock

// ----------------------------------------------------------------------

const helmetData = new HelmetData({});

// ----------------------------------------------------------------------

export default function BlogDetail() {
  return (
    <>
      <Helmet helmetData={helmetData}>
        <title>Dashboard: Blog Details | 片付けサービス</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog Details
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="column" alignItems="end" justifyContent="space-between">

        </Stack>
      </Container>
    </>
  );
}
