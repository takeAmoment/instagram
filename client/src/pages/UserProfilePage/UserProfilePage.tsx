import { getUserByIdApi } from 'api';
import Profile from 'components/Profile/Profile';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UsersPost } from 'types/types';

const UserProfilePage = () => {
  const [posts, setPosts] = useState<UsersPost[] | []>([]);
  const { id } = useParams();

  const loadData = async () => {
    try {
      if (id) {
        const response = await getUserByIdApi(id);
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return <Profile posts={posts} />;
};

export default UserProfilePage;
