import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// layouts
import DashboardLayout from '../components/layouts/DashboardLayout';
import SimpleLayout from '../components/layouts/SimpleLayout';

// Pages
import BlogPage from '../pages/BlogPage';
import Page404 from '../pages/Page404';
import LoginPage from '../pages/LoginPage';
import DashboardAppPage from '../pages/DashboardApp';
// import UserPage from './pages/UserPage';
// import ProductsPage from './pages/ProductsPage';

// const BlogPage = React.lazy(() => import('../pages/BlogPage'));
// const About = React.lazy(() => import('../pages/About'));
// const Service = React.lazy(() => import('../pages/Service'));
// const Contact = React.lazy(() => import('../pages/Contact'));
// const Page404 = React.lazy(() => import('../pages/Page404'));
// const FlowPage = React.lazy(() => import('../pages/Flow'));
// const MaintainPage = React.lazy(() => import('../pages/Maintain'));
// const BlogDetail = React.lazy(() => import('../pages/BlogDetail'));
// const ListBlog = React.lazy(() => import('../pages/ListBlog'));

// ----------------------------------------------------------------------

export default function Router() {
  // const routes = useRoutes([
  //   {
  //     path: '/dashboard',
  //     element: <DashboardLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" />, index: true },
  //       { path: 'app', element: <DashboardAppPage /> },
  //       { path: 'user', element: <UserPage /> },
  //       { path: 'products', element: <ProductsPage /> },
  //       { path: 'blog', element: <BlogPage /> },
  //     ],
  //   },
  //   {
  //     path: 'login',
  //     element: <LoginPage />,
  //   },
  //   {
  //     element: <SimpleLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" />, index: true },
  //       { path: '404', element: <Page404 /> },
  //       { path: '*', element: <Navigate to="/404" /> },
  //     ],
  //   },
  //   {
  //     path: '*',
  //     element: <Navigate to="/404" replace />,
  //   },
  // ]);

  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/" element={<BlogPage />} />
        <Route path='/dashboard' element={<DashboardAppPage />} />
        {/* <Route path="/home" element={<Home />} />
        <Route path={URL_MAPPING.SERVICE_PAGE_URL} element={<Service />} />
        <Route path={URL_MAPPING.FLOW_PAGE_URL} element={<FlowPage />} />
        <Route path={URL_MAPPING.CONTACT_PAGE_URL} element={<Contact />} />
        <Route path="/blog-detail" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<SimpleLayout />}>
        <Route path="/not-found" element={<Page404 />} />
        <Route path="/*" element={<Navigate to="/not-found" />} />
      </Route>
    </Routes>
  );
}
