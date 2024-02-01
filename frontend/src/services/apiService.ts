import axios from 'axios';
import { baseURL } from '../constants/urls';
import { authService } from './authService';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

export const apiService = axios.create({ baseURL });

apiService.interceptors.request.use(async (req) => {
  // interface AccessTokenPayload {
  //   exp: number;
  // }

  // const isAccessTokenValid = (accessToken: string): boolean => {
  //   try {
  //     const decodedToken: AccessTokenPayload = jwtDecode(accessToken);
  //     const currentTime = Date.now() / 1000;

  //     if (decodedToken.exp > currentTime) {
  //       return true; // Token is valid
  //     } else {
  //       return false; // Token is expired
  //     }
  //   } catch (error) {
  //     console.error('Error decoding access token:', error);
  //     return false;
  //   }
  // };

  // const refreshTokens = async (refreshToken: string) => {
  //   const {
  //     data: { access, refresh },
  //   } = await authService.refresh(refreshToken);

  //   if (refresh && access) {
  //     localStorage.setItem('access', access);
  //     localStorage.setItem('refresh', refresh);

  //     return access;
  //   }
  // };

  const accessToken = localStorage.getItem('access');
  // const refreshToken = localStorage.getItem('refresh');

  // const [isValid, setIsValid] = useState<boolean>();

  // if (accessToken && refreshToken) {
  //   setIsValid(isAccessTokenValid(accessToken));

  //   console.log(isValid);
  //   if (isValid) {
  //     req.headers.Authorization = `Bearer ${accessToken}`;
  //   } else {
  //     const newAccess = await refreshTokens(refreshToken);

  //     if (newAccess) {
  //       setIsValid(isAccessTokenValid(newAccess));
  //     }
  //     req.headers.Authorization = `Bearer ${newAccess}`;
  //   }
  // }

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
