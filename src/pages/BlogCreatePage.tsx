import React, { useState } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

// @mui
import { styled } from '@mui/material/styles';
import { Button, Container, Stack, Typography } from '@mui/material';

// components
import { Iconify } from 'src/components/iconify';
import CollapsedBreadcrumbs, { BreadcrumbItem } from 'src/components/Breadcrumbs';
import MarkdownEditor from 'src/components/editor/MarkdownEditor';
import InputControl from 'src/components/form-control/InputControl';
import SwitchIOS from 'src/components/form-control/SwitchIOS';
import InputFileUpload from 'src/components/form-control/InputFileUpload';

// Redux
import { useAppDispatch } from 'src/store/hook';
import { endLoading, openSnackbar, startLoading } from 'src/store/ui';

// API
import { postUpload } from 'src/api/image/postUpload';

// Utils
import { CheckboxValue } from 'src/utils/constants';
import { URL_MAPPING } from 'src/routes/urlMapping';

// Message
import message from 'src/lang/en.json';
import { postCreateBlog } from 'src/api/blog/postCreateBlog';

// ----------------------------------------------------------------------

const helmetData = new HelmetData({});
const breadcrumbs: BreadcrumbItem[] = [
  { name: 'Dashboard', href: URL_MAPPING.DASHBOARD },
  { name: 'Blog', href: URL_MAPPING.BLOG },
  { name: 'Create', href: '' },
];

const PUBLISH_LABEL = { active: 'Publised', disabled: 'Unpublised' };

const StyledButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

// ----------------------------------------------------------------------

interface FormData {
  title: string;
  content: string;
  cover: string;
  published: CheckboxValue;
  file?: File[];
}

export default function BlogCreatePage() {
  // ----------- React Hook -------------------
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ----------- State declare ----------------
  const [loading, setLoading] = useState(false);

  const formConfig = useForm<FormData>({
    defaultValues: {
      title: '',
      content: '',
      cover: '',
      published: 0,
      file: [],
    },
  });

  const { getValues, watch } = formConfig;

  // ----------- Function declare -------------
  const handleSaveBlog = async () => {
    try {
      if (loading) {
        return;
      }
      dispatch(startLoading());
      setLoading(true);

      const { content, cover, published, title, file } = getValues();
      let image = '';

      if (file?.length) {
        image = await handleUploadImage(file[0]);
      }

      await postCreateBlog({
        title,
        published,
        content,
        image: image ? image : cover,
      });

      dispatch(openSnackbar({ message: message['success.update'], severity: 'success' }));
      navigate(URL_MAPPING.BLOG);
    } catch (e) {
      dispatch(openSnackbar({ message: (e as Error).message, severity: 'error' }));
    } finally {
      dispatch(endLoading());
      setLoading(false);
    }
  };

  const handleUploadImage = async (image: File) => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      const { data } = await postUpload(formData);
      return data;
    } catch (e) {
      throw new Error(message['error.upload.image']);
    }
  };

  const handleDiscardChange = () => {
    navigate(URL_MAPPING.BLOG);
  };

  return (
    <FormProvider {...formConfig}>
      <Helmet helmetData={helmetData}>
        <title>Dashboard: Create a new blog | かたづけサービス</title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4">Create a new blog</Typography>
        </Stack>

        <Stack mb={5} direction="column" alignItems="start" justifyContent="space-between">
          <CollapsedBreadcrumbs navigationData={breadcrumbs} />
        </Stack>

        <Stack mb={2} gap={2}>
          <InputControl label="Title" name="title" />
          <InputFileUpload name="file" label="Cover Photo" url={watch('cover')} />
          <SwitchIOS sx={{ display: 'flex', justifyContent: 'end' }} name="published" statusLabel={PUBLISH_LABEL} />
        </Stack>

        <Stack mb={3}>
          <MarkdownEditor name="content" />
        </Stack>
        <Stack mb={3}>
          <StyledButtonContainer>
            <Button variant="outlined" onClick={handleDiscardChange}>
              Cancel
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="mingcute:save-fill" />} onClick={handleSaveBlog}>
              Save Changes
            </Button>
          </StyledButtonContainer>
        </Stack>
      </Container>
    </FormProvider>
  );
}
