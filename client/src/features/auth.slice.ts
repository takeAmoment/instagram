import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { getUserApi, updateUserApi } from 'api';
import { loginApi, registerApi } from 'api/auth';
import { isAxiosError } from 'axios';
import { AuthInitialState, RegisterInfo } from 'types/types';

const initialState: AuthInitialState = {
  userData: {
    userId: '',
    token: '',
    user: null,
  },
  status: 'idle',
  isRegistered: false,
};

export const registerUser = createAsyncThunk('user/register', async (request: RegisterInfo) => {
  try {
    const response = await registerApi(request);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      notification.error({
        message: 'Error ' + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});

export const loginUser = createAsyncThunk('user/login', async (request: RegisterInfo) => {
  try {
    const response = await loginApi(request);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
      notification.error({
        message: 'Error ' + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});

export const getUser = createAsyncThunk('user/get', async () => {
  try {
    const response = await getUserApi();
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
      notification.error({
        message: 'Error ' + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});

export const updateUser = createAsyncThunk('user/update', async (request: FormData) => {
  try {
    const response = await updateUserApi(request);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
      notification.error({
        message: 'Error ' + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.status = 'idle';
      state.isRegistered = false;
      state.userData = {
        token: '',
        userId: '',
        user: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.isRegistered = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'idle';
        state.isRegistered = true;
        notification.success({
          message: 'Hooray!',
          description: 'User was redistered!',
        });
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'failed';
        state.isRegistered = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.userData.token = action.payload.token;
          state.userData.userId = action.payload.userId;
          localStorage.setItem('token', action.payload.token);
          localStorage.setItem('userId', action.payload.userId);
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.userData.user = action.payload;
        }
      })
      .addCase(getUser.rejected, (state) => {
        state.status = 'failed';
        state.userData.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.userData.user = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
