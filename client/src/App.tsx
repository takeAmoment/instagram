import LayoutComponent from 'components/Layout/Layout';
import LoginPage from 'pages/LoginPage/LoginPage';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import HomePage from 'pages/HomePage/HomePage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import CreatePostPage from 'pages/CreatePostPage/CreatePostPage';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import UserProfilePage from 'pages/UserProfilePage/UserProfilePage';

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
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createpost"
            element={
              <ProtectedRoute>
                <CreatePostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
