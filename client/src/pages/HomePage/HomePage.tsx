import { Empty, List, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Post from 'components/Post/Post';
import { getAllPosts } from 'features/post.slice';
import { useAppDispath, useAppSelector } from 'hooks/hooks';
import WelcomePage from 'pages/WelcomePage/WelcomePage';
import React, { useEffect } from 'react';
import { UsersPost } from 'types/types';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const { allPosts, status } = useAppSelector((state) => state.post);
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
        {status === 'loading' && <Spin size="large" />}
        {allPosts.length > 0 && (
          <List
            split={false}
            dataSource={allPosts}
            renderItem={(item: UsersPost) => (
              <List.Item>
                <Post key={item._id} post={item} isModalPost={false} />
              </List.Item>
            )}
          />
        )}
        {allPosts.length === 0 && status !== 'loading' && <Empty description="No posts yet" />}
      </div>
    </Content>
  );
};

export default HomePage;
