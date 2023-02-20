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
  _id: string;
  title: string;
  body: string;
  photo: string;
  likes: string[];
}

export interface PostInitialState {
  usersPosts: UsersPost[];
  allPosts: UsersPost[];
  status: 'idle' | 'loading' | 'failed';
}

export interface PostProps {
  post: UsersPost;
}

export interface PostId {
  postId: string;
}
