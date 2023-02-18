import axios from 'axios';

export const createPostApi = async (request: FormData) =>
  await axios({
    method: 'post',
    url: '/create',
    data: request,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getAllPostsApi = async () => await axios.get('/posts');
