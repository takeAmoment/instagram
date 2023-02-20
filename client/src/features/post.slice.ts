import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPostApi, getAllPostsApi, getUserPostsApi, likePostApi, unlikePostApi } from 'api';
import { isAxiosError } from 'axios';
import { PostId, PostInitialState } from 'types/types';

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

export const getAllPosts = createAsyncThunk('allposts/get', async () => {
  try {
    const response = await getAllPostsApi();
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
  }
});

export const getUserPosts = createAsyncThunk('userPosts/get', async () => {
  try {
    const response = await getUserPostsApi();
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
  }
});

export const likePost = createAsyncThunk('post/like', async (postId: PostId) => {
  try {
    const response = await likePostApi(postId);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
  }
});
export const unlikePost = createAsyncThunk('post/unlike', async (postId: PostId) => {
  try {
    const response = await unlikePostApi(postId);
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
      })
      .addCase(getAllPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.allPosts = action.payload.posts;
        }
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.status = 'failed';
        state.allPosts = [];
      })
      .addCase(getUserPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.usersPosts = action.payload.posts;
      })
      .addCase(getUserPosts.rejected, (state) => {
        state.status = 'failed';
        state.usersPosts = [];
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const newPosts = state.allPosts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          } else {
            return post;
          }
        });
        state.allPosts = newPosts;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const newPosts = state.allPosts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          } else {
            return post;
          }
        });
        state.allPosts = newPosts;
      });
  },
});

export const postReducer = postSlice.reducer;
