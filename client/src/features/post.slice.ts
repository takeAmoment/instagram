import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPostApi } from 'api';
import { isAxiosError } from 'axios';
import { PostInitialState } from 'types/types';

const initialState: PostInitialState = {
  usersPosts: [],
  allPosts: [],
  status: 'idle',
};

export const createPost = createAsyncThunk('post/create', async (request: FormData) => {
  try {
    const response = await createPostApi(request);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(createPost.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
