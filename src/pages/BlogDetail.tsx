import React, { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from 'src/store/hook';
import { RootState } from 'src/store';

// Utils
import { URL_MAPPING } from 'src/routes/urlMapping';
import components from 'src/components/editor/OverrideHTML';
import { getBlogById } from 'src/api/blog/getBlogById';
import { endLoading, openSnackbar, startLoading } from 'src/store/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { BlogItemProps } from 'src/types/Blog';
import { fDate } from 'src/utils/formatTime';

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

interface FormData {
  blogContent?: BlogItemProps;
}

export default function BlogDetail() {
  // ----------- React Hook -------------------
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // ----------- State declare ----------------
  const [loading, setLoading] = useState(false);

  const formConfig = useForm<FormData>();
  const { getValues, setValue } = formConfig;

  // ----------- API Call ---------------------
  useEffect(() => {
    handleGetBlogInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ----------- Function declare -------------
  const handleEditButtonClick = () => {
    navigate(URL_MAPPING.BLOG_EDIT + '/' + id);
  };

  const handleGetBlogInfo = async () => {
    try {
      if (!id || loading) {
        return;
      }

      dispatch(startLoading());
      setLoading(true);
      const { data } = await getBlogById(id);

      if (data) {
        setValue('blogContent', data);
        return;
      }

      setValue('blogContent', undefined);
    } catch (e) {
      dispatch(openSnackbar({ message: (e as Error).message, severity: 'error' }));
    } finally {
      dispatch(endLoading());
      setLoading(false);
    }
  };

  return (
    <FormProvider {...formConfig}>
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
          {getValues('blogContent') && (
            <Card>
              <StyledCardMedia>
                <StyledCover
                  alt={getValues('blogContent.title')}
                  src={getValues('blogContent.image') || '/assets/illustrations/fallback_img.svg'}
                />
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
                      subheader={fDate(getValues('blogContent.createDate'))}
                    />
                  </StyledAvatar>
                  <StyledTitle color="inherit" variant="h2">
                    {getValues('blogContent')?.title}
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
                  {getValues('blogContent.content')}
                </Markdown>
              </Stack>
            </Card>
          )}
        </Stack>
      </Container>
    </FormProvider>
  );
}
