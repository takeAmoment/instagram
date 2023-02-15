import axios from 'axios';
import { Message, RegisterInfo } from 'types/types';

export const registerApi = async (request: RegisterInfo) =>
  await axios.post<Message>('/signup', request);
