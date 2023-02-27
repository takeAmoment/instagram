import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addCommentApi,
  createPostApi,
  deletePostApi,
  getAllPostsApi,
  getFollowingPostsApi,
  getUserPostsApi,
  likePostApi,
  removeCommentApi,
  unlikePostApi,
} from 'api';
import { isAxiosError } from 'axios';
import { CommentInfo, PostId, PostInitialState, RemoveCommentRequest } from 'types/types';
import { notification } from 'antd';

const initialState: PostInitialState = {
  usersPosts: [],
  allPosts: [],
  followingPosts: [],
  status: 'idle',
  isCreated: false,
};

export const createPost = createAsyncThunk('post/create', async (request: FormData) => {
  try {
    const response = await createPostApi(request);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      notification.error({
        message: 'Error' + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});

export const getAllPosts = createAsyncThunk('allposts/get', async () => {
  try {
    const response = await getAllPostsApi();
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      notification.error({
        message: 'Error' + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});

export const getUserPosts = createAsyncThunk('userPosts/get', async () => {
  try {
    const response = await getUserPostsApi();
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      notification.error({
        message: 'Error' + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});

export const likePost = createAsyncThunk('post/like', async (postId: PostId) => {
  try {
    const response = await likePostApi(postId);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      notification.error({
        message: 'Error' + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});
export const unlikePost = createAsyncThunk('post/unlike', async (postId: PostId) => {
  try {
    const response = await unlikePostApi(postId);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      notification.error({
        message: 'Error' + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});

export const addComment = createAsyncThunk('post/addComment', async (request: CommentInfo) => {
  try {
    const response = await addCommentApi(request);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      notification.error({
        message: 'Error' + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});

export const removeComment = createAsyncThunk(
  'post/removeComment',
  async (request: RemoveCommentRequest) => {
    try {
      const response = await removeCommentApi(request);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        notification.error({
          message: 'Error' + error.response?.status,
          description: error.response?.data.message,
        });
        throw new Error(error.message);
      }
    }
  }
);

export const deletePost = createAsyncThunk('post/delete', async (postId: string) => {
  try {
    const response = await deletePostApi(postId);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      notification.error({
        message: 'Error' + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});

export const getFollowingPosts = createAsyncThunk('followingPosts/get', async () => {
  try {
    const response = await getFollowingPostsApi();
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      notification.error({
        message: 'Error' + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
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
        state.isCreated = false;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.status = 'idle';
        state.isCreated = true;
        notification.success({
          message: 'Success!',
          description: 'Your post was created',
        });
      })
      .addCase(createPost.rejected, (state) => {
        state.status = 'failed';
        state.isCreated = false;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.allPosts = action.payload.posts;
          state.isCreated = false;
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
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (action.payload) {
          const newPost = state.allPosts.map((post) => {
            if (post._id === action.payload._id) {
              return action.payload;
            } else {
              return post;
            }
          });
          state.allPosts = newPost;
        }
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        if (action.payload) {
          const newPost = state.allPosts.map((post) => {
            if (post._id === action.payload._id) {
              return action.payload;
            } else {
              return post;
            }
          });
          state.allPosts = newPost;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (action.payload) {
          const newList = state.allPosts.filter((post) => post._id !== action.payload._id);
          state.allPosts = newList;
        }
      })
      .addCase(getFollowingPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFollowingPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.followingPosts = action.payload;
      })
      .addCase(getFollowingPosts.rejected, (state) => {
        state.status = 'failed';
        state.followingPosts = [];
      });
  },
});

export const postReducer = postSlice.reducer;
