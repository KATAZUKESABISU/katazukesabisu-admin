import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import PostCommon from 'src/components/blog-post/PostCommon';
import ImageGallery from 'src/components/blog-post/ImageGallery';
import Coupons from 'src/components/coupons';
import { useNavigate } from 'react-router-dom';
import { GetDataHomepageResponse, HomePageData, getHomePage } from 'src/api/home-admin/getHomePageData';
import { useAppDispatch, useAppSelector } from 'src/store/hook';
import { URL_MAPPING } from 'src/routes/urlMapping';
import { getDataContactUs } from 'src/store/contactUs';
import { Iconify } from 'src/components/iconify';
import { useForm, FormProvider } from 'react-hook-form';

interface Form {
  introduction: string;
}

export function HomeAdmin(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<HomePageData>();
  const [isUpdate, setIsUpdate] = useState(false);
  const contactUs = useAppSelector((state) => state.contactUs);
  const methods = useForm<Form>();
  const { getValues } = methods;

  const getDataHomePage = async () => {
    try {
      const response = await getHomePage();
      if (response === undefined) {
        return;
      }
      const { data } = response as GetDataHomepageResponse;
      setData(data);
    } catch (error) {
      navigate(URL_MAPPING.MAINTAIN);
    }
  };

  const handleEdit = () => {
    setIsUpdate(true);
  };

  const handleUpdate = () => {
    console.log('>>>getValues', getValues());
  };

  useEffect(() => {
    dispatch(getDataContactUs());
    getDataHomePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider {...methods}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Blog
        </Typography>
        <Button variant="contained" onClick={() => handleEdit()} startIcon={<Iconify icon="eva:plus-fill" />}>
          Edit
        </Button>
        <Button variant="contained" onClick={() => handleUpdate()} startIcon={<Iconify icon="eva:plus-fill" />}>
          Update
        </Button>
      </Stack>
      <Box className="p-[16px] lg:px-[60px] lg:w-[1024px] lg:py-[20px] w-[100%] bg-white mx-auto transition-[width] duration-500">
        <h2 className="heading lg:!text-[230%]">{data?.heading}</h2>

        {data !== undefined && (
          <>
            <PostCommon {...data?.homePage.introduction} isUpdate={isUpdate} />
            <PostCommon {...data.homePage.serviceIntro} />
            {/* <ListService {...data?.homePage.serviceList} /> */}
            <ImageGallery {...data?.homePage.serviceGuide} />
            <ImageGallery {...data?.homePage.availableArea} />
            {contactUs !== undefined && <PostCommon {...contactUs.data} />}
            {data?.homePage.coupons?.isDisplay && <Coupons {...data?.homePage.coupons} />}
          </>
        )}
      </Box>
    </FormProvider>
  );
}
