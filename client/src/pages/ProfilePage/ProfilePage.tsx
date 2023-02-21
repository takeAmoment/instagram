import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.module.scss';

import { useAppDispath, useAppSelector } from 'hooks/hooks';
import { getUserApi } from '../../api/index';
import { getUserPosts } from 'features/post.slice';
import Profile from 'components/Profile/Profile';
import { IUser } from 'types/types';

const ProfilePage = () => {
  const posts = useAppSelector((state) => state.post.usersPosts);
  const [user, setUser] = useState<IUser>();
  const dispatch = useAppDispath();

  const getUser = async () => {
    try {
      const response = await getUserApi();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    dispatch(getUserPosts());
  }, [dispatch]);

  return <Profile posts={posts} user={user} />;
};

export default ProfilePage;
