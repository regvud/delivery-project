export const baseURL = 'http://localhost:8080/api';

const departments = '/departments';
const deliveries = '/deliveries';
const delivery = '/delivery';
const auth = '/auth';
const profile = '/profile';
const users = '/users';
const create = '/create';
const activate = '/activate';
const recover = '/recover';
const request = '/request';
const refresh = '/refresh';
const regions = '/regions';
const active = '/active';
const stats = '/stats';

export const urls = {
  users: {
    base: (page: number, params?: string) => `${users}?page=${page}&${params}`,
    byID: (id: number) => `${users}/${id}`,
  },
  deliveries: {
    base: (page: number) => `${deliveries}?page=${page}`,
    byID: (id: number) => `${deliveries}/${id}/info`,
    create: `${deliveries}${create}`,
    addImage: (id: number) => `${deliveries}/${id}/add_image`,
    user: (id: number) => `${users}${deliveries}/${id}`,
    adminDeliveries: (page: number, params?: string) =>
      `${stats}/delivery_list?page=${page}&${params}`,
  },
  departments: {
    base: (page: number) => `${departments}?page=${page}`,
    byID: (id: number) => `${departments}/${id}`,
    create: `${departments}${create}`,
    regions: `${departments}${regions}`,
    active: `${departments}${active}`,
  },
  auth: {
    login: auth,
    register: `${users}${create}`,
    profile: (id: number) => `${users}${profile}/${id}`,
    refresh: `${auth}${refresh}`,
    activate: (token: string) => `${auth}${activate}/${token}`,
    recover: (token: string) => `${auth}${recover}/${token}`,
    recoverRequest: `${auth}${recover}${request}`,
    changeEmailRequest: `${users}${request}/change_email`,
    me: `${auth}/me`,
  },
  profile: {
    base: profile,
    delivery: (id: number) => `${profile}${delivery}/${id}`,
    addAvatar: `${users}/add_avatar`,
    changePassword: `${users}/change_password`,
    changeEmail: (email: string) => `${users}/change_email/${email}`,
    changePhone: `${users}/change_phone`,
  },

  stats: {
    totalUsers: `${stats}/total_users`,
    totalDeliveries: `${stats}/total_deliveries`,
    todayUsers: `${stats}/today_users`,
    todayDeliveries: `${stats}/today_deliveries`,
    prevWeakUsers: `${stats}/prev_weak_users`,
    prevWeakDeliveries: `${stats}/prev_weak_deliveries`,
    currentWeakUsers: `${stats}/current_weak_users`,
    currentWeakDeliveries: `${stats}/current_weak_deliveries`,
    avgPrice: `${stats}/avg_price`,
  },
};
