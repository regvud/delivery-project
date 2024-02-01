import axios from 'axios';
import { baseURL } from '../constants/urls';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { authService } from './authService';
import { jwtDecode } from 'jwt-decode';

const { getItem, setItem, removeItem } = useLocalStorage();

interface AccessTokenPayload {
  exp: number; // Expiration time in Unix epoch format
}

export const isAccessTokenValid = (accessToken: string): boolean => {
  try {
    // Decode the access token
    const decodedToken: AccessTokenPayload = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000; // Convert to seconds (Unix epoch format)

    if (decodedToken.exp > currentTime) {
      return true; // Token is valid
    } else {
      return false; // Token is expired
    }
  } catch (error) {
    console.error('Error decoding access token:', error);
    return false; // Token is invalid (cannot be decoded)
  }
};

export const refreshTokens = async (refreshToken: string) => {
  const {
    data: { access, refresh, code, detail },
  } = await authService.refresh(refreshToken);

  if (refresh && access) {
    setItem('access', access);
    setItem('refresh', refresh);

    return { access: access, refresh: refresh };
  }

  return { code: code, detail: detail };
};

export const apiService = axios.create({ baseURL });

apiService.interceptors.request.use(async (req) => {
  const accessToken = getItem('access');
  const refreshToken = getItem('refresh');

  // if (accessToken && refreshToken) {
  //   const isValidAccess = isAccessTokenValid(accessToken);

  //   if (isValidAccess) {
  //     req.headers.Authorization = `Bearer ${accessToken}`;
  //   } else {
  //     const { access } = await refreshTokens(refreshToken);

  //     if (access) {
  //       req.headers.Authorization = `Bearer ${access}`;
  //     } else {
  //       console.log('Refresh is expired');
  //     }
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
