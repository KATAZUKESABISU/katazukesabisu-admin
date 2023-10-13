import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { FormProvider, useForm } from 'react-hook-form';

// @mui
import { Grid, Button, Container, Stack, Typography, alpha, TablePagination } from '@mui/material';

// components
import { Iconify } from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';

import { GetListBlogRequest, getListBlog } from 'src/api/blog/getListBlog';
import { useAppDispatch } from 'src/store/hook';
import { endLoading, openSnackbar, startLoading } from 'src/store/ui';
import { BlogItemProps } from 'src/types/Blog';

// Message
import message from 'src/lang/en.json';
import { useNavigate } from 'react-router-dom';
import { URL_MAPPING } from 'src/routes/urlMapping';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
];

const helmetData = new HelmetData({});

const defaultSearch: GetListBlogRequest = {
  currentPage: 1,
};

// ----------------------------------------------------------------------

interface FormData {
  searchField: string;
}

export default function BlogPage() {
  // ----------- React Hook -------------------
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ----------- State declare ----------------
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [listPost, setListPost] = useState<BlogItemProps[]>([]);

  const process = useRef(false);

  const formConfig = useForm<FormData>({
    defaultValues: {
      searchField: '',
    },
  });

  // ----------- API Call ---------------------
  useEffect(() => {
    fetchListBlog();
  }, []);

  // ----------- Function declare -------------
  const fetchListBlog = async (args: GetListBlogRequest = defaultSearch) => {
    try {
      if (process.current) {
        return;
      }
      dispatch(startLoading());
      process.current = true;

      const { data, currentPage, totalPage } = await getListBlog(args);

      if (data.content.length === 0) {
        dispatch(openSnackbar({ message: message['notice.apiFetch.noData'], severity: 'info' }));
        return;
      }

      setPage(Number(currentPage) - 1);
      setTotalPage(totalPage);
      setListPost(data.content);
    } catch (e) {
      dispatch(openSnackbar({ message: (e as Error).message, severity: 'error' }));
    } finally {
      dispatch(endLoading());
      process.current = false;
    }
  };

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchListBlog(defaultSearch);
    }

    return;
  };

  const handleChangePage = (_: unknown, nextPage: number) => {
    setPage(nextPage);
    fetchListBlog({ currentPage: nextPage + 1 });
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

        <Stack mb={3} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch onKeyDown={handleSearch} name="searchField" />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        {listPost.length > 0 && (
          <Stack mb={3} bgcolor={(theme) => alpha(theme.palette.primary.main, 0.08)} borderRadius="8px">
            <TablePagination
              component={'div'}
              rowsPerPageOptions={[5, 10, 15]}
              page={page}
              rowsPerPage={5}
              count={5 * totalPage}
              onPageChange={handleChangePage}
              labelRowsPerPage="Blogs per page:"
            />
          </Stack>
        )}

        <Grid container spacing={3}>
          {listPost.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </FormProvider>
  );
}
