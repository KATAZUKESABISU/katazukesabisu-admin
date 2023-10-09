import React from 'react';
import SvgColor from '../../utils/svg-icon/SvgColor';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'blog',
    path: '/',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'dashboard',
  //   path: '/app',
  //   icon: icon('ic_analytics'),
  // },
  // {
  //   title: 'user',
  //   path: '/user',
  //   icon: icon('ic_user'),
  // },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/not-found',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
