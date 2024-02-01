import { urls } from '../constants/urls';
import { PaginatedResponse } from '../types/axiosTypes';
import { Department } from '../types/departmentTypes';
import { apiService } from './apiService';

export const departmentService = {
  getAll: (page: number) =>
    apiService
      .get<PaginatedResponse<Department[]>>(urls.departments.base(page))
      .then((res) => res.data),
  byID: (id: number) =>
    apiService
      .get<Department>(urls.departments.byID(id))
      .then((res) => res.data),
  create: (department: Department) =>
    apiService.post(urls.departments.create, department),
};
