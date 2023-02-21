import React, { useEffect } from 'react';
import styles from './ProfilePage.module.scss';

import { useAppDispath, useAppSelector } from 'hooks/hooks';
import { getUserPosts } from 'features/post.slice';
import Profile from 'components/Profile/Profile';

const ProfilePage = () => {
  const posts = useAppSelector((state) => state.post.usersPosts);
  const dispatch = useAppDispath();

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);

  return <Profile posts={posts} />;
};

export default ProfilePage;
