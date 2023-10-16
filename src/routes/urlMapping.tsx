import React from 'react';
import SvgColor from 'src/components/utils/svg-icon/SvgColor';

// ----------------------------------------------------------------------

export enum URL_MAPPING {
  ROOT = '/',
  DASHBOARD = '/',
  BLOG = '/blog',
  BLOG_DETAIL = '/blog/blog-detail',
  BLOG_CREATE = '/blog/blog-create',
  BLOG_EDIT = '/blog/blog-edit',
  MAINTAIN = '/maintain',
  PAGE_404 = '/not-found',
  LOGIN = '/login',
  RESET_PASSWORD = '/reset-password',
  NEW_PASSWORD = '/new-password',

  // Not implement yet
  HOME_PAGE_URL = '/home',
  ABOUT_US_PAGE_URL = '/about',
  SERVICE_PAGE_URL = '/service',
  FLOW_PAGE_URL = '/flow',
  CONTACT_PAGE_URL = '/contact',
}

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export const navConfig = [
  {
    title: 'dashboard',
    path: URL_MAPPING.DASHBOARD,
    icon: icon('ic_analytics'),
  },
  {
    title: 'home',
    path: URL_MAPPING.HOME_PAGE_URL,
    icon: icon('ic_home'),
  },
  {
    title: 'service',
    path: URL_MAPPING.SERVICE_PAGE_URL,
    icon: icon('ic_service'),
  },
  {
    title: 'flow',
    path: URL_MAPPING.FLOW_PAGE_URL,
    icon: icon('ic_flow'),
  },
  {
    title: 'about',
    path: URL_MAPPING.ABOUT_US_PAGE_URL,
    icon: icon('ic_about'),
  },
  {
    title: 'contact',
    path: URL_MAPPING.CONTACT_PAGE_URL,
    icon: icon('ic_contact'),
  },
  {
    title: 'blog',
    path: URL_MAPPING.BLOG,
    icon: icon('ic_blog'),
  },
];
