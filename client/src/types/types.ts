import { AxiosError } from 'axios';

export interface RegisterInfo {
  name?: string;
  email: string;
  password: string;
}

export interface AuthInitialState {
  userData: {
    userId: string;
    token: string;
  };
  status: 'idle' | 'loading' | 'failed';
  error: AxiosError | null;
}

export type Message = {
  message: string;
};
