import { Content } from 'antd/es/layout/layout';
import { getFollowingPostsApi } from 'api';
import Post from 'components/Post/Post';
import WelcomePage from 'pages/WelcomePage/WelcomePage';
import React, { useEffect, useState } from 'react';
import { UsersPost } from 'types/types';
import styles from './FollowingPostsPage.module.scss';

const FollowingPostsPage = () => {
  const [posts, setPosts] = useState<UsersPost[] | []>([]);
  const token = localStorage.getItem('token');

  const getFollowingPosts = async () => {
    try {
      const response = await getFollowingPostsApi();
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      getFollowingPosts();
    }
  }, [token]);

  if (!token) {
    return <WelcomePage />;
  }
  return (
    <Content>
      <div className={styles.container}>
        {posts.length > 0 &&
          posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
      </div>
    </Content>
  );
};

export default FollowingPostsPage;
