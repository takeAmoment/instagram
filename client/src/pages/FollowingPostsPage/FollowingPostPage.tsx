import { Empty, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Post from 'components/Post/Post';
import { getFollowingPosts } from 'features/post.slice';
import { useAppDispath, useAppSelector } from 'hooks/hooks';
import React, { useEffect } from 'react';
import styles from './FollowingPostsPage.module.scss';

const FollowingPostsPage = () => {
  const { followingPosts, status } = useAppSelector((state) => state.post);
  const dispatch = useAppDispath();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(getFollowingPosts());
    }
  }, [token, dispatch]);

  return (
    <Content>
      <div className={styles.container}>
        {status === 'loading' && <Spin size="large" />}
        {followingPosts.length > 0 &&
          followingPosts.map((post) => {
            return <Post key={post._id} post={post} isModalPost={false} />;
          })}
        {followingPosts.length === 0 && status !== 'loading' && (
          <Empty description="No posts yet" />
        )}
      </div>
    </Content>
  );
};

export default FollowingPostsPage;
