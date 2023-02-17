import axios, { InternalAxiosRequestConfig } from 'axios';
export * from './post';

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers ?? {};

    config.headers['Authorization'] = `Bearer ` + localStorage.getItem('token');

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      localStorage.clear();
    }
  }
);
