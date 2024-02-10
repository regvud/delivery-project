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

export const urls = {
  deliveries: {
    base: (page: number) => `${deliveries}?page=${page}`,
    byID: (id: number) => `${deliveries}/${id}/info`,
    create: `${deliveries}${create}`,
    user: `${users}${deliveries}`,
  },
  departments: {
    base: (page: number) => `${departments}?page=${page}`,
    byID: (id: number) => `${departments}/${id}`,
    create: `${departments}${create}`,
  },
  auth: {
    login: auth,
    register: `${users}${create}`,
    profile: `${users}${profile}`,
    refresh: `${auth}${refresh}`,
    activate: (token: string) => `${auth}${activate}/${token}`,
    recover: (token: string) => `${auth}${recover}/${token}`,
    recoverRequest: `${auth}${recover}${request}`,
  },
  profile: {
    base: profile,
    delivery: (id: number) => `${profile}${delivery}/${id}`,
  },
};
