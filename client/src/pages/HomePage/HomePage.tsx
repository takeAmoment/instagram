import { Content } from 'antd/es/layout/layout';
import Post from 'components/Post/Post';
import React from 'react';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <Content>
      <div className={styles.container}>
        <Post />
        <Post />
      </div>
    </Content>
  );
};

export default HomePage;
