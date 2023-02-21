import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Menu from 'antd/es/menu';
import { logout } from 'features/auth.slice';
import { useAppDispath } from 'hooks/hooks';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const HeaderOfApp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token') ?? null;
  const dispatch = useAppDispath();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const items = [
    { label: <Link to="/login">Login</Link>, key: 'login' },
    { label: <Link to="/register">Sign up</Link>, key: 'register' },
  ];
  const itemsRegisterUser = [
    { label: <Link to="/profile">Profile</Link>, key: 'profile' },
    { label: <Link to="/createpost">Create post</Link>, key: 'createpost' },
    { label: <Link to="/followingposts">Posts</Link>, key: 'followingposts' },
    {
      label: (
        <Button type="link" style={{ color: 'black' }} onClick={handleLogout}>
          Logout
        </Button>
      ),
      key: 'logout',
    },
  ];

  return (
    <Header className={styles.header}>
      <Link to="/" className={styles.header__logo}>
        <div>Instagram</div>
      </Link>
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[location.pathname.slice(1)]}
        items={token ? itemsRegisterUser : items}
        style={{ width: '100%', display: 'flex', justifyContent: 'end' }}
      />
    </Header>
  );
};

export default HeaderOfApp;
