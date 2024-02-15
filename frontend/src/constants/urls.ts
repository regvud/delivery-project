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

export const urls = {
  deliveries: {
    base: (page: number) => `${deliveries}?page=${page}`,
    byID: (id: number) => `${deliveries}/${id}/info`,
    create: `${deliveries}${create}`,
    addImage: (id: number) => `${deliveries}/${id}/add_image`,
    user: `${users}${deliveries}`,
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
    profile: `${users}${profile}`,
    refresh: `${auth}${refresh}`,
    activate: (token: string) => `${auth}${activate}/${token}`,
    recover: (token: string) => `${auth}${recover}/${token}`,
    recoverRequest: `${auth}${recover}${request}`,
    me: `${auth}/me`,
  },
  profile: {
    base: profile,
    delivery: (id: number) => `${profile}${delivery}/${id}`,
    addAvatar: `${users}/add_avatar`,
    changePassword: `${users}/change_password`,
    changeEmail: `${users}/change_email`,
    changePhone: `${users}/change_phone`,
  },
};
