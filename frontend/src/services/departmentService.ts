import { urls } from '../constants/urls';
import { PaginatedResponse } from '../types/axiosTypes';
import {
  CreateDepartment,
  Department,
  DepartmentNumber,
  Regions,
} from '../types/departmentTypes';
import { apiService } from './apiService';

type StatusData = {
  status: boolean;
};

export const departmentService = {
  getAll: (page: number) =>
    apiService
      .get<PaginatedResponse<Department[]>>(urls.departments.base(page))
      .then((res) => res.data),
  byID: (id: number) =>
    apiService
      .get<Department>(urls.departments.byID(id))
      .then((res) => res.data),
  create: (department: CreateDepartment) =>
    apiService.post(urls.departments.create, department),
  regions: () =>
    apiService
      .get<Regions>(urls.departments.regions)
      .then((res) => res.data.regions),
  active: () =>
    apiService
      .get<DepartmentNumber[]>(urls.departments.active)
      .then((res) => res.data),
  manipulate: (id: number, data: StatusData): Promise<Department> => {
    return apiService
      .patch(urls.departments.byID(id), data)
      .then((res) => res.data);
  },
};
