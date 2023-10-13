import React from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

// Markdown
import Markdown from 'markdown-to-jsx';

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

const StyledPostInfo = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  padding: theme.spacing(5),
  backgroundColor: alpha(theme.palette.grey[900], 0.45),
}));

// ----------------------------------------------------------------------

export default function BlogDetail() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    navigate(URL_MAPPING.BLOG_EDIT + '/' + id);
  };

  return (
    <>
      <Helmet helmetData={helmetData}>
        <title>Dashboard: Blog Details | かたづけサービス</title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4">Blog Details</Typography>
          <Button onClick={handleEditButtonClick} variant="contained" startIcon={<Iconify icon="bxs:edit" />}>
            Edit
          </Button>
        </Stack>

        <Stack mb={3} direction="column" alignItems="start" justifyContent="space-between">
          <CollapsedBreadcrumbs navigationData={breadcrumbs} />
        </Stack>

        <Stack mb={3}>
          <Card>
            <StyledCardMedia>
              <StyledCover alt={blogDetail.title} src={blogDetail.image} />
              <StyledPostInfo>
                <StyledAvatar>
                  <Avatar alt={user.displayName} src={user.photoUrl} />
                  <CardHeader
                    sx={{
                      padding: 0,
                      '& .MuiCardHeader-title': {
                        color: 'HighlightText',
                        fontWeight: 'normal',
                      },
                      '& .MuiCardHeader-subheader': {
                        color: '#ffffffad',
                      },
                    }}
                    title={user.displayName}
                    subheader={blogDetail.createDate}
                  />
                </StyledAvatar>
                <StyledTitle color="inherit" variant="h2">
                  {blogDetail.title}
                </StyledTitle>
              </StyledPostInfo>
            </StyledCardMedia>
            <Stack padding={(theme: Theme) => theme.spacing(6)}>
              <Markdown
                className="markdown-body"
                options={{
                  wrapper: 'div',
                  forceBlock: true,
                  overrides: components,
                }}
              >
                {blogDetail.content}
              </Markdown>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </>
  );
}
