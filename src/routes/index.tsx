import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// layouts
import ProtectRoutes from 'src/components/layouts/ProtectRoutes';
import SimpleLayout from '../components/layouts/SimpleLayout';

// Redux
import { loadToken } from 'src/store/auth';
import { useAppDispatch } from 'src/store/hook';

// Pages
import BlogPage from '../pages/BlogPage';
import BlogDetail from '../pages/BlogDetail';
import Page404 from '../pages/Page404';
import LoginPage from '../pages/LoginPage';
import DashboardAppPage from '../pages/DashboardApp';
import { URL_MAPPING } from './urlMapping';
// import UserPage from './pages/UserPage';
// import ProductsPage from './pages/ProductsPage';

// ----------------------------------------------------------------------

export default function Router() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadToken());
  }, []);

  return (
    <Routes>
      <Route path={URL_MAPPING.ROOT} element={<ProtectRoutes />}>
        <Route path={URL_MAPPING.BLOG} element={<BlogPage />} />
        <Route path={URL_MAPPING.DASHBOARD} element={<DashboardAppPage />} />
        <Route path={URL_MAPPING.BLOG_DETAIL} element={<BlogDetail />} />
        {/* <Route path="/home" element={<Home />} />
        <Route path={URL_MAPPING.FLOW_PAGE_URL} element={<FlowPage />} />
        <Route path={URL_MAPPING.CONTACT_PAGE_URL} element={<Contact />} />
        <Route path="/blog-detail" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Route>
      <Route path={URL_MAPPING.LOGIN} element={<LoginPage />} />
      <Route path={URL_MAPPING.ROOT} element={<SimpleLayout />}>
        <Route path={URL_MAPPING.PAGE_404} element={<Page404 />} />
        <Route path="/*" element={<Navigate to={URL_MAPPING.PAGE_404} />} />
      </Route>
    </Routes>
  );
}
