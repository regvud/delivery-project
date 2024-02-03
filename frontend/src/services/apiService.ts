import axios from 'axios';
import { baseURL } from '../constants/urls';

export const apiService = axios.create({ baseURL });

apiService.interceptors.request.use(async (req) => {
  const accessToken = localStorage.getItem('access');
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
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
