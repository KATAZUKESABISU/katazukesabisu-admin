import React from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { FormProvider, useForm } from 'react-hook-form';

// @mui
import { styled, alpha, Theme } from '@mui/material/styles';
import { Button, Container, Stack, Typography, Avatar, Card, CardHeader } from '@mui/material';

// components
import { Iconify } from 'src/components/iconify';
import CollapsedBreadcrumbs, { BreadcrumbItem } from 'src/components/Breadcrumbs';

// Redux
import { useAppSelector } from 'src/store/hook';
import { RootState } from 'src/store';

// Utils
import { URL_MAPPING } from 'src/routes/urlMapping';
import { blogDetail } from 'src/_mock/blog-details';
import components from 'src/components/editor/OverrideHTML';
import MarkdownEditor from 'src/components/editor/MarkdownEditor';

// ----------------------------------------------------------------------

const helmetData = new HelmetData({});
const breadcrumbs: BreadcrumbItem[] = [
  { name: 'Dashboard', href: URL_MAPPING.DASHBOARD },
  { name: 'Blog', href: URL_MAPPING.BLOG },
  { name: 'Edit', href: '' },
];

const StyledCardMedia = styled('div')({
  position: 'relative',
  height: '500px',
  '& img': {
    maxHeight: '500px',
  },
});

const StyledTitle = styled(Typography)({
  color: 'HighlightText',
  overflow: 'hidden',
  WebkitLineClamp: 3,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled('div')(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(5),
  bottom: theme.spacing(5),
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const StyledButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  width: '100%',
}));

// ----------------------------------------------------------------------

interface FormData {
  title: string;
  content: string;
  cover: string;
}

export default function BlogDetail() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { id } = useParams();

  const formConfig = useForm<FormData>({
    defaultValues: {
      title: blogDetail.title,
      content: blogDetail.content,
      cover: blogDetail.image,
    },
  });

  const { getValues } = formConfig;

  return (
    <FormProvider {...formConfig}>
      <Helmet helmetData={helmetData}>
        <title>Dashboard: Edit a blog post | かたづけサービス</title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4">Edit a blog post</Typography>
        </Stack>

        <Stack mb={3} direction="column" alignItems="start" justifyContent="space-between">
          <CollapsedBreadcrumbs navigationData={breadcrumbs} />
        </Stack>

        <Stack mb={3}>
          <MarkdownEditor name="content" />
        </Stack>
        <Stack mb={3}>
          <StyledButtonContainer>
            <Button variant="contained" startIcon={<Iconify icon="mingcute:save-fill" />}>
              Save Changes
            </Button>
          </StyledButtonContainer>
        </Stack>
      </Container>
    </FormProvider>
  );
}
