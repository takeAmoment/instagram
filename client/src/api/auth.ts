import axios from 'axios';
import { Message, RegisterInfo, UserData } from 'types/types';

export const registerApi = async (request: RegisterInfo) =>
  await axios.post<Message>('/signup', request);

export const loginApi = async (request: RegisterInfo) =>
  await axios.post<UserData>('/signin', request);
