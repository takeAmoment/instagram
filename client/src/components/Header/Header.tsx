import { Header } from 'antd/es/layout/layout';
import Menu from 'antd/es/menu';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';

const items = [
  { label: <Link to="/profile">Profile</Link>, key: 'profile' },
  { label: <Link to="/createpost">Create post</Link>, key: 'createpost' },
  { label: <Link to="/login">Login</Link>, key: 'login' },
  { label: <Link to="/register">Sign up</Link>, key: 'register' },
];
const HeaderOfApp = () => {
  const location = useLocation();

  return (
    <Header className={styles.header}>
      <Link to="/" className={styles.header__logo}>
        <div>Instagram</div>
      </Link>
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[location.pathname.slice(1)]}
        items={items}
        style={{ width: '100%', display: 'flex', justifyContent: 'end' }}
      />
    </Header>
  );
};

export default HeaderOfApp;
