import { jwtDecode } from 'jwt-decode';
import { authService } from './authService';

interface AccessTokenPayload {
  exp: number;
}

export const updateRefreshToken = async () => {
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');

  if (!accessToken || !refreshToken) {
    console.error('No tokens provided');
    return false;
  }

  const currentTime = Date.now() / 1000;

  const decodedAccess: AccessTokenPayload = jwtDecode(accessToken);
  const decodedRefresh: AccessTokenPayload = jwtDecode(refreshToken);

  if (decodedRefresh.exp > currentTime && decodedAccess.exp > currentTime)
    return true;
  else {
    return await refreshTokens(refreshToken);
  }

  async function refreshTokens(refreshToken: string) {
    try {
      const {
        data: { access, refresh },
      } = await authService.refresh(refreshToken);

      if (refresh && access) {
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      return false;
    }
  }
};
