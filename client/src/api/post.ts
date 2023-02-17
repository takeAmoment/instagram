import axios from 'axios';

export const createPostApi = async (request: FormData) =>
  axios({
    method: 'post',
    url: '/create',
    data: request,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
