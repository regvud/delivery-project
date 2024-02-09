import { urls } from '../constants/urls';
import { RefreshResponse } from '../types/axiosTypes';
import { Profile, UserLogin, UserRegister } from '../types/userTypes';
import { apiService } from './apiService';

export const authService = {
  login: (user: UserLogin) => apiService.post(urls.auth.login, user),
  refresh: (refreshToken: string) =>
    apiService.post<RefreshResponse>(urls.auth.refresh, {
      refresh: refreshToken,
    }),
  register: (user: UserRegister) => apiService.post(urls.auth.register, user),
  activate: (token: string) => apiService.post(urls.auth.activate(token)),
  recover: (password: string, token: string) =>
    apiService.post(urls.auth.recover(token), { password: password }),
  recoverRequest: (email: string) =>
    apiService.post(urls.auth.recoverRequest, { email: email }),
  profile: () =>
    apiService.get<Profile>(urls.auth.profile).then((res) => res.data),
  addAvatar: (avatar: FormData) =>
    apiService.post<{ avatar: FormData }>(urls.profile.addAvatar, {
      avatar: avatar,
    }),
};
