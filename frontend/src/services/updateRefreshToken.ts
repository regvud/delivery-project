import { jwtDecode } from 'jwt-decode';
import { authService } from './authService';

interface AccessTokenPayload {
  exp: number;
}

export const updateRefreshToken = async () => {
  try {
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    if (!accessToken || !refreshToken) {
      console.error('No tokens provided');
      throw new Error('No tokens provided');
    }

    const refreshTokens = async (refreshToken: string) => {
      try {
        const {
          data: { access, refresh },
        } = await authService.refresh(refreshToken);

        if (refresh && access) {
          localStorage.setItem('access', access);
          localStorage.setItem('refresh', refresh);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error refreshing tokens:', error);
        throw error;
      }
    };

    const decodedToken: AccessTokenPayload = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp > currentTime) {
      return false;
    } else {
      return await refreshTokens(refreshToken);
    }
  } catch (error) {
    console.error('Error updating tokens:', error);
    throw error;
  }
};
