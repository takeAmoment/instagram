import axios from 'axios';

export const getUserByIdApi = async (id: string) => await axios.get(`/user/${id}`);
