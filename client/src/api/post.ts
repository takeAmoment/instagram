import axios from 'axios';
import { CommentInfo, PostId, RemoveCommentRequest } from 'types/types';

export const createPostApi = async (request: FormData) =>
  await axios({
    method: 'post',
    url: '/create',
    data: request,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getAllPostsApi = async () => await axios.get('/posts');

export const getUserPostsApi = async () => await axios.get('/userposts');

export const likePostApi = async (postId: PostId) => await axios.put('/like', postId);

export const unlikePostApi = async (postId: PostId) => await axios.put('/unlike', postId);

export const addCommentApi = async (request: CommentInfo) =>
  await axios.put('/addComment', request);

export const removeCommentApi = async (request: RemoveCommentRequest) =>
  await axios.put('/removeComment', request);

export const deletePostApi = async (postId: string) => await axios.delete(`/delete/${postId}`);

export const getFollowingPostsApi = async () => await axios.get('/getsubposts');
