export const baseURL = 'http://localhost:8080/api';

const deliveries = '/deliveries';
const delivery = '/delivery';
const auth = '/auth';
const profile = '/profile';
const users = '/users';
const create = '/create';
const activate = '/activate';

export const urls = {
  deliveries: {
    base: (page: number) => `${deliveries}?page=${page}`,
    byID: (id: number) => `${deliveries}/${id}/info`,
    create: `${deliveries}${create}`,
    user: `${users}${deliveries}`,
  },
  auth: {
    login: auth,
    register: `${users}${create}`,
    profile: `${users}${profile}`,
    activate: (token: string) => `${auth}${activate}/${token}`,
  },
  profile: {
    base: profile,
    delivery: (id: number) => `${profile}${delivery}/${id}`,
  },
};
