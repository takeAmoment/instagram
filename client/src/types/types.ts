import { UploadFile } from 'antd';

export interface RegisterInfo {
  name?: string;
  email: string;
  password: string;
}
export interface UserData {
  userId: string;
  token: string;
  user: IUser | null;
}
export interface AuthInitialState {
  userData: UserData;
  status: 'idle' | 'loading' | 'failed';
  isRegistered: boolean;
}

export type Message = {
  message: string;
};

export interface CreatePostInfo {
  title: string;
  body: string;
  files: UploadFile[];
}
export interface IComment {
  text: string;
  postedBy: {
    _id: string;
    name: string;
    avatar: string;
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
    avatar: string;
  };
  photo: string;
  likes: string[];
  comments: IComment[];
}

export interface PostInitialState {
  usersPosts: UsersPost[];
  allPosts: UsersPost[];
  status: 'idle' | 'loading' | 'failed';
  isCreated: boolean;
}

export interface PostProps {
  post: UsersPost;
  isModalPost: boolean;
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
  user: IUser | null;
  follow?: () => void;
  unfollow?: () => void;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  info: string;
  followers: string[];
  following: string[];
  avatar: string;
}

export interface FollowId {
  followId: string;
}

export interface UnfollowId {
  unfollowId: string;
}

export interface EditForm {
  name: string;
  email: string;
  info: string;
  files: UploadFile[];
}

export interface CommentProps {
  comment: IComment;
  handleDeleteComment: (comment: IComment) => void;
}
