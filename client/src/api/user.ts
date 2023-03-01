import axios from 'axios';
import { FollowId } from 'types/types';

export const getUserApi = async () => await axios.get('/user');

export const getUserByIdApi = async (id: string) => await axios.get(`/user/${id}`);

export const followApi = async (followId: FollowId) => await axios.put(`/follow`, followId);

export const unfollowApi = async (unfollowId: FollowId) => await axios.put(`/unfollow`, unfollowId);

export const updateUserApi = async (request: FormData) =>
  await axios({
    method: 'patch',
    url: '/userupdate',
    data: request,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const findUserApi = async (query: string) =>
  await axios.get(`/finduser`, { params: { search: query } });
