import { jwtDecode } from 'jwt-decode';
import { authService } from '../services/authService';
import { useState, useEffect } from 'react';

interface AccessTokenPayload {
  exp: number;
}

export const useTokenUpdater = () => {
  const [update, setUpdate] = useState<boolean>();

  useEffect(() => {
    const updateRefreshToken = async () => {
      const accessToken = localStorage.getItem('access');
      const refreshToken = localStorage.getItem('refresh');

      if (!accessToken || !refreshToken) {
        console.error('No tokens provided');
        return;
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
          }

          return false;
        } catch (error) {
          console.error('Error refreshing tokens:', error);
          return false;
        }
      };

      try {
        const decodedToken: AccessTokenPayload = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          setUpdate(false);
        } else {
          setUpdate(await refreshTokens(refreshToken));
        }
      } catch (error) {
        console.error(`Error decoding access token: ${error}`);
        setUpdate(false);
      }
    };

    updateRefreshToken();
  }, [update]);
  return update;
};
