import axios from 'axios';
import { baseURL } from '../constants/urls';
import { updateRefreshToken } from './updateRefreshToken';

export const apiService = axios.create({ baseURL });

let isRedirecting = true;

apiService.interceptors.request.use(async (req) => {
  isRedirecting = await updateRefreshToken();
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
  async (error) => {
    if (!isRedirecting && error.response.status === 401) {
      // Handle unauthorized errors (e.g., token expired) differently
      window.location.href = '/login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
