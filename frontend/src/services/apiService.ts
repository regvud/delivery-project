import axios from 'axios';
import { baseURL } from '../constants/urls';
import { updateRefreshToken } from './updateRefreshToken';

export const apiService = axios.create({ baseURL });

apiService.interceptors.request.use(async (req) => {
  await updateRefreshToken();
  const accessToken = localStorage.getItem('access');
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return error;
  }
);

// axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       const update = await updateRefreshToken();
//       if (update) {
//         return axios(originalRequest);
//       }
//     }

//     return error;
//   }
// );
