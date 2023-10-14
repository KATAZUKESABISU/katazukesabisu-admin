import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { FormProvider, useForm } from 'react-hook-form';

// @mui
import { Grid, Button, Container, Stack, Typography, TablePagination, LinearProgress } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// components
import { Iconify } from 'src/components/iconify';
import { BlogPostCard, BlogPostsSearch } from 'src/sections/@dashboard/blog';

import { GetListBlogRequest, getListBlog } from 'src/api/blog/getListBlog';
import { useAppDispatch } from 'src/store/hook';
import { endLoading, openSnackbar, startLoading } from 'src/store/ui';
import { BlogItemProps } from 'src/types/Blog';

// Message
import message from 'src/lang/en.json';
import { useNavigate } from 'react-router-dom';
import { URL_MAPPING } from 'src/routes/urlMapping';
import SelectControl from 'src/components/form-control/SelectControl';

// ----------------------------------------------------------------------

const helmetData = new HelmetData({});

const defaultSearch: GetListBlogRequest = {
  currentPage: 1,
  limit: 5,
};

const PUBLISH_OPTIONS = [
  { label: 'Published', value: 1 },
  { label: 'Unpublished', value: 0 },
];

const StyledLoading = styled(LinearProgress)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
});

// ----------------------------------------------------------------------

interface FormData {
  searchField: string;
  published: number[];
  prevSearch: GetListBlogRequest;
}

export default function BlogPage() {
  // ----------- React Hook -------------------
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ----------- State declare ----------------
  const [page, setPage] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);
  const [limit, setLimit] = useState(5);
  const [listPost, setListPost] = useState<BlogItemProps[]>([]);
  const [loading, setLoading] = useState(false);

  const formConfig = useForm<FormData>({
    defaultValues: {
      searchField: '',
      published: [],
      prevSearch: defaultSearch,
    },
  });

  const { getValues, setValue } = formConfig;

  // ----------- API Call ---------------------
  useEffect(() => {
    fetchListBlog();
  }, []);

  // ----------- Function declare -------------
  const bindingSearchCondition = () => {
    const request = { ...defaultSearch };
    const { published, searchField } = getValues();

    if (searchField) {
      request.title = searchField;
    }

    if (published.length === 1) {
      request.published = published[0];
    }

    setValue('prevSearch', request);
  };

  const fetchListBlog = async (page = 1) => {
    try {
      if (loading) {
        return;
      }
      dispatch(startLoading());
      setLoading(true);

      const request = getValues('prevSearch');
      const { data, currentPage, totalRecord } = await getListBlog({ ...request, currentPage: page });

      if (data.content.length === 0) {
        setListPost([]);
        setPage(0);
        setTotalRecord(0);
        dispatch(openSnackbar({ message: message['notice.apiFetch.noData'], severity: 'info' }));
        return;
      }

      setPage(Number(currentPage) - 1);
      setTotalRecord(totalRecord);
      setListPost(data.content);
    } catch (e) {
      dispatch(openSnackbar({ message: (e as Error).message, severity: 'error' }));
    } finally {
      dispatch(endLoading());
      setLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      bindingSearchCondition();
      fetchListBlog();
    }
  };

  const handleSearch = () => {
    bindingSearchCondition();
    fetchListBlog();
  };

  const handleChangePage = (_: unknown, nextPage: number) => {
    setPage(nextPage);
    fetchListBlog(nextPage + 1);
  };

  const handleLimitChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const limit = Number(e.target.value);
    setValue('prevSearch.limit', limit);
    setLimit(limit);
    fetchListBlog();
  };

  return (
    <FormProvider {...formConfig}>
      <Helmet helmetData={helmetData}>
        <title>Dashboard: Blog | かたづけサービス</title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(URL_MAPPING.BLOG_CREATE)}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Post
          </Button>
        </Stack>

        <Stack mb={3} direction="column" gap={2} alignItems="start" justifyContent="space-between">
          <BlogPostsSearch onKeyDown={handleKeyPress} name="searchField" />
          <Stack
            width="100%"
            direction="column"
            gap={2}
            alignItems="end"
            justifyContent="start"
            sx={(theme) => ({ [theme.breakpoints.up('md')]: { flexDirection: 'row', alignItems: 'center' } })}
          >
            <SelectControl label="Publish status" name="published" options={PUBLISH_OPTIONS} />
            <Button
              sx={{ minWidth: '156px' }}
              variant="contained"
              size="large"
              onClick={handleSearch}
              startIcon={<Iconify icon="material-symbols:search" />}
            >
              Search
            </Button>
          </Stack>
        </Stack>

        <Stack
          mb={3}
          position="relative"
          bgcolor={(theme) => alpha(theme.palette.primary.main, 0.08)}
          borderRadius="8px"
        >
          <TablePagination
            component={'div'}
            rowsPerPageOptions={[5, 10, 15]}
            page={page}
            rowsPerPage={limit}
            count={totalRecord}
            onPageChange={handleChangePage}
            labelRowsPerPage="Blogs per page:"
            onRowsPerPageChange={handleLimitChange}
          />
          {loading && <StyledLoading />}
        </Stack>

        <Grid container spacing={3}>
          {listPost.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </FormProvider>
  );
}
