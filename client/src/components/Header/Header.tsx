import { Header } from 'antd/es/layout/layout';
import Menu from 'antd/es/menu';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const items = [
  { label: <Link to="/login">Login</Link>, key: 'login' },
  { label: <Link to="/register">Sign up</Link>, key: 'register' },
];
const HeaderOfApp = () => {
  return (
    <Header className={styles.header}>
      <Link to="/" className={styles.header__logo}>
        <div>Instagram</div>
      </Link>
      <Menu theme="light" mode="horizontal" selectedKeys={[location.pathname]} items={items} />
    </Header>
  );
};

export default HeaderOfApp;
