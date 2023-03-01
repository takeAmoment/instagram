import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Menu from 'antd/es/menu';
import { logout } from 'features/auth.slice';
import { useAppDispath } from 'hooks/hooks';
import React, { useState } from 'react';
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
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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
        className={styles.header__menu}
        selectedKeys={[location.pathname.slice(1)]}
        items={token ? itemsRegisterUser : items}
      />
      <Button
        className={styles.burger__menu}
        type="primary"
        shape="circle"
        icon={<MenuOutlined className={styles.burger__icon} />}
        onClick={showDrawer}
      ></Button>
      <Drawer width="320px" placement="right" onClose={onClose} open={open}>
        <div className={styles.drawer__contant}>
          {token ? (
            <>
              <Link to="/" className={styles.drawer__link} onClick={onClose}>
                Home page
              </Link>
              <Link to="/profile" className={styles.drawer__link} onClick={onClose}>
                Profile
              </Link>
              <Link to="/createpost" className={styles.drawer__link} onClick={onClose}>
                Create Post
              </Link>
              <Link to="/followingposts" className={styles.drawer__link} onClick={onClose}>
                Following Post
              </Link>
              <Link to="/login" className={styles.drawer__link} onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.drawer__link} onClick={onClose}>
                Login
              </Link>
              <Link to="/signup" className={styles.drawer__link} onClick={onClose}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </Drawer>
    </Header>
  );
};

export default HeaderOfApp;
