import React, { useEffect, useState } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

// Markdown
import Markdown from 'markdown-to-jsx';

// @mui
import { styled, alpha, Theme } from '@mui/material/styles';
import { Button, Container, Stack, Typography, Avatar, Card, CardHeader, Box } from '@mui/material';

// components
import { Iconify } from 'src/components/iconify';
import CollapsedBreadcrumbs, { BreadcrumbItem } from 'src/components/Breadcrumbs';
import components from 'src/components/editor/OverrideHTML';
import DialogConfirmDelete from 'src/components/dialog/DialogConfirmDelete';

// Redux
import { useAppDispatch, useAppSelector } from 'src/store/hook';
import { RootState } from 'src/store';
import { endLoading, openSnackbar, startLoading } from 'src/store/ui';

// API
import { getBlogById } from 'src/api/blog/getBlogById';
import { postDeleteBlog } from 'src/api/blog/postDeleteBlog';

// Utils
import { fDate } from 'src/utils/formatTime';
import { URL_MAPPING } from 'src/routes/urlMapping';
import { BlogItemProps } from 'src/types/Blog';

// Message
import message from 'src/lang/en.json';

// ----------------------------------------------------------------------

const helmetData = new HelmetData({});
const breadcrumbs: BreadcrumbItem[] = [
  { name: 'Dashboard', href: URL_MAPPING.DASHBOARD },
  { name: 'Blog', href: URL_MAPPING.BLOG },
  { name: 'Blog Details', href: '' },
];

const StyledCardMedia = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '500px',
  '& img': {
    maxHeight: '500px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '240px',
    '& img': {
      maxHeight: '240px',
    },
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: '#FFF',
  overflow: 'hidden',
  WebkitLineClamp: 3,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',

  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const StyledAvatar = styled('div')(({ theme }) => ({
  zIndex: 9,
  height: 32,
  position: 'absolute',
  left: theme.spacing(5),
  bottom: theme.spacing(5),
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    left: theme.spacing(2),
    bottom: theme.spacing(2),
    gap: theme.spacing(2),
  },
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

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
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
  const [openModal, setOpenModal] = useState(false);

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

  const handleDeleteButtonClick = async () => {
    try {
      if (!id || loading) {
        return;
      }
      setOpenModal(false);
      dispatch(startLoading());
      setLoading(true);

      await postDeleteBlog(id);

      dispatch(openSnackbar({ message: message['success.delete'], severity: 'success' }));
      navigate(URL_MAPPING.BLOG);
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

      <Container
        maxWidth="xl"
        sx={(theme) => ({
          ...(theme.palette.mode === 'light' && {
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            py: theme.spacing(3),

            [theme.breakpoints.down('lg')]: {
              mx: theme.spacing(3),
              maxWidth: `calc(100% - ${theme.spacing(6)})`,
            },
          }),
        })}
      >
        <Stack
          sx={(theme) => ({
            flexDirection: 'row',
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              gap: theme.spacing(2),
              alignItems: 'start',
            },
          })}
          alignItems="center"
          justifyItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Typography variant="h4">Blog Details</Typography>
          <Box
            display="flex"
            gap={(theme) => theme.spacing(2)}
            sx={(theme) => ({
              flexDirection: 'row',
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column-reverse',
                width: '100%',
                '.MuiButtonBase-root.MuiButton-root': {
                  width: '100%',
                },
              },
            })}
          >
            <Button
              sx={{ width: '156px' }}
              onClick={() => setOpenModal(true)}
              variant="outlined"
              color="error"
              startIcon={<Iconify icon="material-symbols:delete-outline" />}
            >
              Delete
            </Button>
            <Button
              sx={{ width: '156px' }}
              onClick={handleEditButtonClick}
              variant="contained"
              startIcon={<Iconify icon="bxs:edit" />}
            >
              Edit
            </Button>
          </Box>
        </Stack>

        <Stack mb={3} direction="column" alignItems="start" justifyContent="space-between">
          <CollapsedBreadcrumbs navigationData={breadcrumbs} />
        </Stack>

        <Stack>
          {getValues('blogContent') && (
            <Card
              sx={(theme) => ({
                backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
                backdropFilter: 'blur(20px)',
                m: theme.palette.mode === 'dark' ? 'unset' : '0 -24px -24px',
                borderRadius: theme.palette.mode === 'dark' ? '12px' : 'unset',
                [theme.breakpoints.down('sm')]: {
                  m: theme.palette.mode === 'dark' ? 'unset' : '0 -16px -24px',
                },
              })}
            >
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
                          color: '#FFF',
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
              <Stack
                padding={(theme: Theme) => theme.spacing(6)}
                sx={(theme) => ({
                  img: {
                    opacity: theme.palette.mode === 'dark' ? 0.7 : 1,
                  },
                  '.markdown-body table tr:nth-of-type(2n)': {
                    backgroundColor: alpha(theme.palette.divider, 0.5),
                  },
                  padding: theme.spacing(6),
                  [theme.breakpoints.down('sm')]: {
                    padding: theme.spacing(2),
                  },
                })}
              >
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
      <DialogConfirmDelete
        isOpen={openModal}
        handleClose={() => setOpenModal(false)}
        handleConfirm={handleDeleteButtonClick}
      />
    </FormProvider>
  );
}
