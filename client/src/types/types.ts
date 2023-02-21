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
export interface Comment {
  text: string;
  postedBy: {
    _id: string;
    name: string;
  };
  _id: string;
}

export interface UsersPost {
  _id: string;
  title: string;
  body: string;
  postedBy: {
    _id: string;
    name: string;
  };
  photo: string;
  likes: string[];
  comments: Comment[];
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

export interface CommentInfo extends PostId {
  text: string;
}

export interface RemoveCommentRequest {
  _id: string;
  postId: string;
}

export interface ProfileProps {
  posts: UsersPost[] | [];
  user: IUser | undefined;
  follow?: () => void;
  unfollow?: () => void;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  followers: string[];
  following: string[];
}

export interface FollowId {
  followId: string;
}

export interface UnfollowId {
  unfollowId: string;
}
