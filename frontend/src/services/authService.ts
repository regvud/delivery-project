import axios from 'axios';
import { urls, baseURL } from '../constants/urls';
import { RefreshResponse } from '../types/axiosTypes';
import { Profile, User, UserLogin, UserRegister } from '../types/userTypes';
import { apiService } from './apiService';

export const authService = {
  login: (user: UserLogin) => axios.post(`${baseURL}${urls.auth.login}`, user),
  me: () => apiService.get<User>(urls.auth.me).then((res) => res.data),
  refresh: (refreshToken: string) =>
    axios.post<RefreshResponse>(`${baseURL}${urls.auth.refresh}`, {
      refresh: refreshToken,
    }),
  register: (user: UserRegister) =>
    axios.post(`${baseURL}${urls.auth.register}`, user),
  activate: (token: string) =>
    axios.post(`${baseURL}${urls.auth.activate(token)}`),
  recover: (password: string, token: string) =>
    axios.post(`${baseURL}${urls.auth.recover(token)}`, { password: password }),
  recoverRequest: (email: string) =>
    axios.post(`${baseURL}${urls.auth.recoverRequest}`, { email: email }),
  changeEmailRequest: (email: string) =>
    apiService.post(`${urls.auth.changeEmailRequest}`, { email: email }),
  profile: {
    profile: (id: number) =>
      apiService.get<Profile>(urls.auth.profile(id)).then((res) => res.data),
    addAavatar: (avatar: FormData) =>
      apiService.post(urls.profile.addAvatar, avatar),
    changePassword: (password: string) =>
      apiService.post(urls.profile.changePassword, { password: password }),
    changeEmail: (email: string) =>
      apiService.post(urls.profile.changeEmail(email)),
    changePhone: (phone: string) =>
      apiService.post<User>(urls.profile.changePhone, { phone: phone }),
  },
};
