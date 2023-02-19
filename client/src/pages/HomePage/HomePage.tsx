import { Content } from 'antd/es/layout/layout';
import Post from 'components/Post/Post';
import { getAllPosts } from 'features/post.slice';
import { useAppDispath, useAppSelector } from 'hooks/hooks';
import WelcomePage from 'pages/WelcomePage/WelcomePage';
import React, { useEffect } from 'react';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const { allPosts } = useAppSelector((state) => state.post);
  const dispatch = useAppDispath();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      dispatch(getAllPosts());
    }
  }, [dispatch, token]);

  if (!token) {
    return <WelcomePage />;
  }
  return (
    <Content>
      <div className={styles.container}>
        {allPosts.length > 0 &&
          allPosts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
      </div>
    </Content>
  );
};

export default HomePage;
