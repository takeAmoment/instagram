import React, { useEffect } from 'react';

import { useAppDispath, useAppSelector } from 'hooks/hooks';
import { getUserPosts } from 'features/post.slice';
import Profile from 'components/Profile/Profile';
import { getUser } from 'features/auth.slice';

const ProfilePage = () => {
  const posts = useAppSelector((state) => state.post.usersPosts);
  const { user } = useAppSelector((state) => state.auth.userData);
  const dispatch = useAppDispath();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getUserPosts());
  }, [dispatch]);

  return <Profile posts={posts} user={user} />;
};

export default ProfilePage;
