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
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import InputComponent from 'src/components/custom-input/InputComponent';

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
    setIsUpdate(!isUpdate);
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
        <Button variant="contained" onClick={() => handleEdit()} startIcon={!isUpdate ? <EditIcon /> : <CancelIcon />}>
          {!isUpdate ? 'Edit' : 'Cancel'}
        </Button>
        <Button variant="contained" color="error" onClick={() => handleUpdate()} startIcon={<UpgradeIcon />}>
          Update
        </Button>
      </Stack>
      <Box className="p-[16px] lg:px-[60px] lg:w-[1024px] lg:py-[20px] w-[100%] bg-white mx-auto transition-[width] duration-500">
        {!isUpdate ? (
          <h2 className="heading lg:!text-[230%]">{data?.heading}</h2>
        ) : (
          <InputComponent id="heading" name="heading" onChange={() => {}} defaultValue={data?.heading || ''} />
        )}

        {data !== undefined && (
          <>
            <PostCommon {...data?.homePage.introduction} isUpdate={isUpdate} id="post1" />
            <PostCommon {...data.homePage.serviceIntro} isUpdate={isUpdate} id="post2" />
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
