import { urls } from '../constants/urls';
import { apiService } from './apiService';

type AvgPriceRes = {
  avg_price: number;
};

type TotalUserRes = {
  total_users: number;
};

type TotalDeliveriesRes = {
  total_deliveries: number;
};

type TodayUserRes = {
  today_users: number;
};

type TodayDeliveries = {
  today_deliveries: number;
};

type PrevWeakUsers = {
  prev_weak_users: number;
};
type PrevWeakDeliveries = {
  prev_weak_deliveries: number;
};
type CurrentWeakUsers = {
  current_weak_users: number;
};
type CurrentWeakDeliveries = {
  current_weak_deliveries: number;
};

export const statService = {
  avgPrice: () => apiService.get<AvgPriceRes>(urls.stats.avgPrice),
  totalUsers: () => apiService.get<TotalUserRes>(urls.stats.totalUsers),
  totalDeliveries: () =>
    apiService.get<TotalDeliveriesRes>(urls.stats.totalDeliveries),
  todayUsers: () => apiService.get<TodayUserRes>(urls.stats.todayUsers),
  todayDeliveries: () =>
    apiService.get<TodayDeliveries>(urls.stats.todayDeliveries),
  prevWeakUsers: () => apiService.get<PrevWeakUsers>(urls.stats.prevWeakUsers),
  currentWeakUsers: () =>
    apiService.get<CurrentWeakUsers>(urls.stats.currentWeakUsers),
  prevWeakDeliveries: () =>
    apiService.get<PrevWeakDeliveries>(urls.stats.prevWeakDeliveries),
  currentWeakDeliveries: () =>
    apiService.get<CurrentWeakDeliveries>(urls.stats.currentWeakDeliveries),
};
