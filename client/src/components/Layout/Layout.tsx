import Layout from 'antd/es/layout/layout';
import FooterOfApp from 'components/Footer/Footer';
import HeaderOfApp from 'components/Header/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const LayoutComponent = () => {
  return (
    <Layout>
      <HeaderOfApp />
      <Outlet />
      <FooterOfApp />
    </Layout>
  );
};

export default LayoutComponent;
