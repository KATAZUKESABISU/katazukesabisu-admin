import { ImageGalleryProps } from '../../components/blog-post/ImageGallery';
import { ImageGalleryProps as ImageGallery } from '../../components/blog-post/ListService';
import { PostCommonProps } from '../../components/blog-post/type';
import { CouponProps } from '../../components/coupons';
import { AbstractResponse, get, put } from '../utils';

interface HomePage {
  introduction: PostCommonProps;
  serviceIntro: PostCommonProps;
  serviceList: ImageGallery;
  serviceGuide: ImageGalleryProps;
  availableArea: ImageGalleryProps;
  coupons?: CouponProps;
}

export type HomePageData = {
  heading: string;
  homePage: HomePage;
};

export interface GetDataHomepageResponse extends AbstractResponse {
  data: HomePageData;
}

export const putHomePage = async (args: HomePageData) => {
  const response = await put<GetDataHomepageResponse>('/api/home_page/update', args, 'admin');

  if (response.statusCode !== 200) {
    throw response;
  }

  return response;
};
