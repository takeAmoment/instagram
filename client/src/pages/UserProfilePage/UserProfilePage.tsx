import { notification } from 'antd';
import { followApi, getUserByIdApi, unfollowApi } from 'api';
import { isAxiosError } from 'axios';
import Profile from 'components/Profile/Profile';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUser, UsersPost } from 'types/types';

const UserProfilePage = () => {
  const [posts, setPosts] = useState<UsersPost[] | []>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const { id } = useParams();

  const loadData = async () => {
    try {
      if (id) {
        const response = await getUserByIdApi(id);
        setPosts(response.data.posts);
        setUser(response.data.user);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        notification.error({
          message: 'Error ' + error.response?.status,
          description: error.response?.data.message,
        });
        throw new Error(error.message);
      }
    }
  };

  const follow = async () => {
    try {
      if (id) {
        const response = await followApi({ followId: id });
        setUser(response.data);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        notification.error({
          message: 'Error ' + error.response?.status,
          description: error.response?.data.message,
        });
        throw new Error(error.message);
      }
    }
  };
  const unfollow = async () => {
    try {
      if (id) {
        const response = await unfollowApi({ followId: id });
        setUser(response.data);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        notification.error({
          message: 'Error ' + error.response?.status,
          description: error.response?.data.message,
        });
        throw new Error(error.message);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return <Profile posts={posts} user={user} follow={follow} unfollow={unfollow} />;
};

export default UserProfilePage;
