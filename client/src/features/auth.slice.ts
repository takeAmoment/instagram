import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi, registerApi } from 'api/auth';
import { isAxiosError } from 'axios';
import { AuthInitialState, RegisterInfo } from 'types/types';

const initialState: AuthInitialState = {
  userData: {
    userId: '',
    token: '',
  },
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk('user/register', async (request: RegisterInfo) => {
  try {
    const response = await registerApi(request);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
  }
});

export const loginUser = createAsyncThunk('user/login', async (request: RegisterInfo) => {
  try {
    const response = await loginApi(request);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'idle';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'failed';
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
      });
  },
});
