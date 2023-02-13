import LayoutComponent from 'components/Layout/Layout';
import WelcomePage from 'pages/WelcomePage/WelcomePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#13c2c2',
        },
      }}
    >
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
