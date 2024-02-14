import { urls } from '../constants/urls';
import { PaginatedResponse } from '../types/axiosTypes';
import { UserDeliveriesResponse } from '../types/deliveryTypes';
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
  getUserDeliveries: () =>
    apiService
      .get<UserDeliveriesResponse>(urls.deliveries.user)
      .then((res) => res.data),

  create: (delivery: Delivery) =>
    apiService.post<Delivery>(urls.deliveries.create, delivery),
};
