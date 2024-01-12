import { urls } from '../constants/urls';
import { Profile, UserLogin, UserRegister } from '../types/userTypes';
import { apiService } from './apiService';

export const authService = {
  login: (user: UserLogin) => apiService.post(urls.auth.login, user),
  register: (user: UserRegister) => apiService.post(urls.auth.register, user),
  profile: () =>
    apiService.get<Profile>(urls.auth.profile).then((res) => res.data),
};
