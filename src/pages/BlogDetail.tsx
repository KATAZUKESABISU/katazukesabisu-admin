import React from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';

// @mui
import { styled, alpha } from '@mui/material/styles';
import { Button, Container, Stack, Typography, Link, Avatar, Card } from '@mui/material';

// components
import { Iconify } from '../components/iconify';
import CollapsedBreadcrumbs, { BreadcrumbItem } from 'src/components/Breadcrumbs';
import { URL_MAPPING } from 'src/routes/urlMapping';
import { useAppSelector } from 'src/store/hook';
import { blogDetail } from 'src/_mock/blog-details';

// ----------------------------------------------------------------------

const helmetData = new HelmetData({});
const breadcrumbs: BreadcrumbItem[] = [
  { name: 'Dashboard', href: URL_MAPPING.DASHBOARD },
  { name: 'Blog', href: URL_MAPPING.BLOG },
  { name: 'Blog Details', href: '' },
];

const StyledCardMedia = styled('div')({
  position: 'relative',
  height: '500px',
  '& img': {
    maxHeight: '500px',
  },
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(5),
  bottom: theme.spacing(5),
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

export default function BlogDetail() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <Helmet helmetData={helmetData}>
        <title>Dashboard: Blog Details | かたづけサービス</title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4">Blog Details</Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button>
        </Stack>

        <Stack mb={3} direction="column" alignItems="start" justifyContent="space-between">
          <CollapsedBreadcrumbs navigationData={breadcrumbs} />
        </Stack>

        <Stack mb={3}>
          <Card sx={{}}>
            <StyledCardMedia
              sx={{
                '&:after': {
                  bottom: '0',
                  content: "''",
                  width: '100%',
                  height: '20%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.3),
                },
              }}
            >
              <StyledAvatar alt={user.displayName} src={user.photoUrl} />
              <StyledCover alt={blogDetail.title} src={blogDetail.image} />
            </StyledCardMedia>
          </Card>
        </Stack>
      </Container>
    </>
  );
}
