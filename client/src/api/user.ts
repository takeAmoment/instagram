import axios from 'axios';
import { FollowId } from 'types/types';

export const getUserApi = async () => await axios.get('/user');

export const getUserByIdApi = async (id: string) => await axios.get(`/user/${id}`);

export const followApi = async (followId: FollowId) => await axios.put(`/follow`, followId);

export const unfollowApi = async (unfollowId: FollowId) => await axios.put(`/unfollow`, unfollowId);
