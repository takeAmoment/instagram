import axios from 'axios';
import { RegisterInfo } from 'types/types';

export const registerApi = async (request: RegisterInfo) =>
  await axios.post<string>('/signup', request);
