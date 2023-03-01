import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addCommentApi,
  createPostApi,
  deletePostApi,
  followApi,
  getAllPostsApi,
  getFollowingPostsApi,
  getUserByIdApi,
  getUserPostsApi,
  likePostApi,
  removeCommentApi,
  unfollowApi,
  unlikePostApi,
} from 'api';
import { isAxiosError } from 'axios';
import {
  CommentInfo,
  FollowId,
  PostId,
  PostInitialState,
  RemoveCommentRequest,
  UsersPost,
} from 'types/types';
import { notification } from 'antd';

const initialState: PostInitialState = {
  usersPosts: [],
  allPosts: [],
  followingPosts: [],
  selectedUser: {
    user: null,
    posts: [],
  },
  currentPost: null,
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

export const getUserById = createAsyncThunk('user/getById', async (id: string) => {
  try {
    const response = await getUserByIdApi(id);
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

export const followToUser = createAsyncThunk('user/follow', async (request: FollowId) => {
  try {
    const response = await followApi(request);
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
export const unfollowToUser = createAsyncThunk('user/unfollow', async (request: FollowId) => {
  try {
    const response = await unfollowApi(request);
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
  reducers: {
    changeAllPosts: (state) => {
      const currentPost = state.currentPost;
      if (currentPost) {
        const newPost = state.allPosts.map((post) => {
          if (post._id === currentPost._id) {
            return currentPost;
          } else {
            return post;
          }
        });
        state.allPosts = newPost;
      }
    },
    changeFollowingPosts: (state) => {
      const currentPost = state.currentPost;
      if (currentPost) {
        const newPost = state.followingPosts.map((post) => {
          if (post._id === currentPost._id) {
            return currentPost;
          } else {
            return post;
          }
        });
        state.followingPosts = newPost;
      }
    },
    changeUsersPosts: (state) => {
      const currentPost = state.currentPost;
      if (currentPost) {
        const newPost = state.usersPosts.map((post) => {
          if (post._id === currentPost._id) {
            return currentPost;
          } else {
            return post;
          }
        });
        state.usersPosts = newPost;
      }
    },
    changeSelectedUsersPosts: (state) => {
      const currentPost = state.currentPost;
      if (currentPost) {
        const newPost = state.selectedUser.posts.map((post) => {
          if (post._id === currentPost._id) {
            return currentPost;
          } else {
            return post;
          }
        });
        state.selectedUser.posts = newPost;
      }
    },
    setCurrentPost: (state, action: PayloadAction<UsersPost>) => {
      state.currentPost = action.payload;
    },
    deletePostFromAll: (state) => {
      const currentPost = state.currentPost;
      if (currentPost) {
        const newList = state.allPosts.filter((post) => post._id !== currentPost._id);
        state.allPosts = newList;
      }
      state.currentPost = null;
    },
    deleteCurrentPost: (state) => {
      const currentPost = state.currentPost;
      if (currentPost) {
        const newList = state.usersPosts.filter((post) => post._id !== currentPost._id);
        state.usersPosts = newList;
      }
      state.currentPost = null;
    },
  },
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
        state.currentPost = action.payload;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentPost = action.payload;
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
      })
      .addCase(getUserById.pending, (state) => {
        state.status = 'loading';
        state.selectedUser = {
          user: null,
          posts: [],
        };
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.selectedUser = action.payload;
        }
      })
      .addCase(getUserById.rejected, (state) => {
        state.status = 'failed';
        state.selectedUser = {
          user: null,
          posts: [],
        };
      })
      .addCase(followToUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(followToUser.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.selectedUser.user = action.payload;
        }
      })
      .addCase(followToUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(unfollowToUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(unfollowToUser.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.selectedUser.user = action.payload;
        }
      })
      .addCase(unfollowToUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
export const {
  changeAllPosts,
  changeFollowingPosts,
  changeUsersPosts,
  setCurrentPost,
  deleteCurrentPost,
  deletePostFromAll,
} = postSlice.actions;
export const postReducer = postSlice.reducer;
