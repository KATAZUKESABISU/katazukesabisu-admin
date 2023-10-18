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
import { putHomePage } from 'src/api/home-admin/putHomePage';
import { openSnackbar } from 'src/store/ui';

interface Form {
  introduction: string;
  heading: string;
}

const defaultValue: HomePageData = {
  heading: '不用品・粗大ゴミの回収なら片付けサービス',
  homePage: {
    introduction: {
      title: '不用品の回収は、全てお任せください！',
      createDate: '',
      isDisplay: true,
      content: [
        {
          type: 'image',
          data: {
            file: {
              url: 'https://res.cloudinary.com/disdzwovt/image/upload/v1697424868/KATAZUKESABISU/homepage_1.jpg',
            },
            caption: '',
          },
        },
        {
          type: 'paragraph',
          data: {
            text: 'かたづけサービスは不用品・粗大ゴミ・引っ越しでのゴミなどの回収に困っているお客様は、ご軽気にご連絡ください',
          },
        },
        {
          type: 'paragraph',
          data: {
            text: '<strong>お見積りは無料です！</strong>',
          },
        },
      ],
    },
    serviceIntro: {
      title: '追加料金は一切なし！',
      createDate: '',
      style: 'with-background',
      button: [
        {
          innerText: '料金プランはこちら',
          location: '/service#price',
        },
      ],
      isDisplay: true,
      content: [
        {
          type: 'image',
          data: {
            file: {
              url: 'https://res.cloudinary.com/disdzwovt/image/upload/v1697424869/KATAZUKESABISU/homepage_2.webp',
            },
            caption: '',
          },
        },
        {
          type: 'header',
          data: {
            text: '出張費・お見積り・基本料金は全て無料！',
            withBackground: true,
            level: 4,
          },
        },
        {
          type: 'paragraph',
          data: {
            text: '全てお任せください！お客様はお立ち合いだけです。',
          },
        },
        {
          type: 'paragraph',
          data: {
            text: 'お見積りでご提示した金額は搬出作業費や掃除作業費なども全て含まれておりますので、追加料金は一切ありません。',
          },
        },
      ],
    },
    serviceList: {
      title: 'おたすけクリーンのお約束',
      isDisplay: true,
      content: [
        {
          image: 'https://res.cloudinary.com/disdzwovt/image/upload/v1697424851/KATAZUKESABISU/161060655013303.png',
          title: '最短30分以内に到着！',
          content: 'お申し込みいただいてから最短で30分で作業を開始します。',
        },
        {
          image: 'https://res.cloudinary.com/disdzwovt/image/upload/v1697424852/KATAZUKESABISU/161060655013301.png',
          title: '24時間年中無休で対応可能！',
          content: '思い立った時にお申し込みください。24時間体制で即日対応可能です。',
        },
        {
          image: 'https://res.cloudinary.com/disdzwovt/image/upload/v1697424853/KATAZUKESABISU/161060655013302.png',
          title: 'コロナ対策を徹底しています！',
          content: '手洗い・検温・消毒・マスクの着用など、感染拡大防止策を徹底しております。',
        },
      ],
    },
    serviceGuide: {
      title: 'サービス案内',
      style: 'width-background',
      button: [
        {
          innerText: 'サービス・料金案内はこちら',
          location: '/service',
        },
      ],
      isDisplay: true,
      content: [
        {
          src: 'https://res.cloudinary.com/disdzwovt/image/upload/v1697424871/KATAZUKESABISU/homepage_3.png',
          subTitle: '粗大ゴミの回収',
          alt: 'クレジットカード支払_VISA',
          caption: '山積みのゴミにお困りしませんか？',
        },
        {
          src: 'https://res.cloudinary.com/disdzwovt/image/upload/v1697424872/KATAZUKESABISU/homepage_4.png',
          subTitle: '不用品の撤去',
          alt: 'クレジットカード支払_VISA',
          caption: '山積みのゴミにお困りしませんか？',
        },
        {
          src: 'https://res.cloudinary.com/disdzwovt/image/upload/v1697424873/KATAZUKESABISU/homepage_5.png',
          subTitle: '引っ越しのお掃除',
          alt: 'クレジットカード支払_VISA',
          caption: 'お引越しのお客様はご安心いただけます！',
        },
        {
          src: 'https://res.cloudinary.com/disdzwovt/image/upload/v1697424874/KATAZUKESABISU/homepage_6.jpg',
          subTitle: 'モノの買取',
          alt: 'クレジットカード支払_VISA',
          caption: '捨てそうな家電製品は高額で販売できるかもしれません！',
        },
      ],
    },
    availableArea: {
      title: '対応エリア',
      style: 'img-map',
      isDisplay: true,
      content: [
        {
          src: 'https://res.cloudinary.com/disdzwovt/image/upload/v1697424875/KATAZUKESABISU/homepage_7.jpg',
          alt: '大阪．兵庫．奈良エリア',
          caption: '',
        },
      ],
    },
  },
};

export function HomeAdmin(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<HomePageData>();
  const [isUpdate, setIsUpdate] = useState(false);
  const contactUs = useAppSelector((state) => state.contactUs);
  const methods = useForm<HomePageData>({
    defaultValues: defaultValue,
    values: data,
  });
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

  const handleUpdate = async () => {
    console.log('>>>getValues', getValues());
    const value = getValues();
    if (value === undefined) {
      return;
    }
    const response = await putHomePage(value);
    if (response.data) {
      dispatch(
        openSnackbar({
          message: 'Updated Successfully!!!',
        })
      );
      getDataHomePage();
      setIsUpdate(false);
    }
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
              <PostCommon {...data?.homePage.introduction} isUpdate={isUpdate} id="introduction" />
              <PostCommon {...data.homePage.serviceIntro} isUpdate={isUpdate} id="serviceIntro" />
              <ImageGallery {...data?.homePage.serviceGuide} isUpdate={isUpdate} id="serviceGuide" width={100} />
              <ImageGallery {...data?.homePage.availableArea} isUpdate={isUpdate} id="availableArea" width={100} />
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
              <PostCommon {...data?.homePage.introduction} id="introduction" />
              <PostCommon {...data.homePage.serviceIntro} id="serviceIntro" />
              <ImageGallery {...data?.homePage.serviceGuide} id="serviceGuide" />
              <ImageGallery {...data?.homePage.availableArea} id="availableArea" />
              {contactUs !== undefined && <PostCommon {...contactUs.data} />}
              {data?.homePage.coupons?.isDisplay && <Coupons {...data?.homePage.coupons} />}
            </>
          )}
        </Box>
      </div>
    </FormProvider>
  );
}
