import Profile from 'components/Profile/Profile';
import { followToUser, getUserById, unfollowToUser } from 'features/post.slice';
import { useAppDispath, useAppSelector } from 'hooks/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserProfilePage = () => {
  const { user, posts } = useAppSelector((state) => state.post.selectedUser);
  const dispatch = useAppDispath();
  const { id } = useParams();

  const follow = () => {
    if (id) {
      dispatch(followToUser({ followId: id }));
    }
  };
  const unfollow = async () => {
    if (id) {
      dispatch(unfollowToUser({ followId: id }));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [id, dispatch]);

  return <Profile posts={posts} user={user} follow={follow} unfollow={unfollow} />;
};

export default UserProfilePage;
