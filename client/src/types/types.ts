import { UploadFile } from 'antd';
import { AxiosError } from 'axios';

export interface RegisterInfo {
  name?: string;
  email: string;
  password: string;
}
export interface UserData {
  userId: string;
  token: string;
}
export interface AuthInitialState {
  userData: UserData;
  status: 'idle' | 'loading' | 'failed';
  error: AxiosError | null;
}

export type Message = {
  message: string;
};

export interface CreatePostInfo {
  title: string;
  body: string;
  files: UploadFile[];
}
export interface UsersPost {
  tilte: string;
  body: string;
  photo: string;
}

export interface PostInitialState {
  usersPosts: UsersPost[];
  allPosts: UsersPost[];
  status: 'idle' | 'loading' | 'failed';
}
