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
import { useForm, FormProvider } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import InputComponent from 'src/components/custom-input/InputComponent';

interface Form {
  introduction: string;
  heading: string;
}

export function HomeAdmin(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<HomePageData>();
  const [isUpdate, setIsUpdate] = useState(false);
  const contactUs = useAppSelector((state) => state.contactUs);
  const methods = useForm<Form>();
  const { getValues, watch } = methods;

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
      <div className="flex flex-row gap-5">
        <Box className="p-[16px] lg:px-[60px] lg:w-[1024px] lg:py-[20px] w-[100%] bg-white mx-auto transition-[width] duration-500">
          {!isUpdate ? (
            <h2 className="heading lg:!text-[230%]">{data?.heading}</h2>
          ) : (
            <InputComponent id="heading" name="heading" defaultValue={data?.heading || ''} />
          )}

          {data !== undefined && (
            <>
              <PostCommon {...data?.homePage.introduction} isUpdate={isUpdate} id="post1" />
              <PostCommon {...data.homePage.serviceIntro} isUpdate={isUpdate} id="post2" />
              {/* <ListService {...data?.homePage.serviceList} /> */}
              <ImageGallery {...data?.homePage.serviceGuide} isUpdate={isUpdate} id="gallery1" width={100} />
              <ImageGallery {...data?.homePage.availableArea} isUpdate={isUpdate} id="gallery2" width={100} />
              {contactUs !== undefined && <PostCommon {...contactUs.data} />}
              {data?.homePage.coupons?.isDisplay && <Coupons {...data?.homePage.coupons} />}
            </>
          )}
        </Box>

        <Box className="p-[16px] lg:px-[60px] lg:w-[1024px] lg:py-[20px] w-[80%] bg-white mx-auto transition-[width] duration-500">
          <Typography className="heading lg:!text-[230%]" variant="h2">
            {Object.keys(watch()).length > 0 ? watch('heading') : data?.heading}
          </Typography>

          {data !== undefined && (
            <>
              <PostCommon {...data?.homePage.introduction} id="post1" />
              <PostCommon {...data.homePage.serviceIntro} id="post2" />
              {/* <ListService {...data?.homePage.serviceList} /> */}
              <ImageGallery {...data?.homePage.serviceGuide} id="gallery1" />
              <ImageGallery {...data?.homePage.availableArea} id="gallery2" />
              {contactUs !== undefined && <PostCommon {...contactUs.data} />}
              {data?.homePage.coupons?.isDisplay && <Coupons {...data?.homePage.coupons} />}
            </>
          )}
        </Box>
      </div>
    </FormProvider>
  );
}
