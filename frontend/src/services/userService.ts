import { urls } from '../constants/urls';
import { User, UserResponse } from '../types/userTypes';
import { apiService } from './apiService';

type PatchData = {
  is_active: boolean;
};

export const userService = {
  getAll: () =>
    apiService.get<UserResponse>(urls.users.base).then((res) => res.data),
  patchUser: (id: number, data: PatchData) =>
    apiService.patch<User>(urls.users.byID(id), data),
};
