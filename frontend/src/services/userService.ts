import { urls } from '../constants/urls';
import { PatchData, User, UserResponse } from '../types/userTypes';
import { apiService } from './apiService';

export const userService = {
  getAll: (page: number, params?: string) =>
    apiService.get<UserResponse>(urls.users.base(page, params)),
  byID: (id: number) => apiService.get<User>(urls.users.byID(id)),
  patchUser: (id: number, data: PatchData) =>
    apiService.patch<User>(urls.users.byID(id), data),
};
