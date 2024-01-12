import axios from 'axios';
import { baseURL } from '../constants/urls';

export const apiService = axios.create({ baseURL });

apiService.interceptors.request.use((req) => {
  const access = localStorage.getItem('access');

  if (access) {
    req.headers.Authorization = `Bearer ${access}`;
  }

  return req;
});

apiService.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return error;
  }
);
