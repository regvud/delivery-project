import { urls } from '../constants/urls';
import { PaginatedResponse } from '../types/axiosTypes';
import { AdminDelivery, UserDeliveriesResponse } from '../types/deliveryTypes';
import { apiService } from './apiService';
import { Delivery } from '../types/deliveryTypes';

export const deliveryService = {
  getAll: (page: number) =>
    apiService
      .get<PaginatedResponse<Delivery[]>>(urls.deliveries.base(page))
      .then((res) => res.data),

  byID: (id: number) =>
    apiService.get<Delivery>(urls.deliveries.byID(id)).then((res) => res.data),
  addImage: (id: number, image: FormData) =>
    apiService
      .post(urls.deliveries.addImage(id), image)
      .then((res) => res.data),
  getUserDeliveries: (id: number) =>
    apiService.get<UserDeliveriesResponse>(urls.deliveries.user(id)),

  create: (delivery: Delivery) =>
    apiService.post<Delivery>(urls.deliveries.create, delivery),
  getAdminDeliveries: (page: number) =>
    apiService
      .get<PaginatedResponse<AdminDelivery[]>>(
        urls.deliveries.adminDeliveries(page)
      )
      .then((res) => res.data),
};
