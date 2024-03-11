import { create } from 'zustand';

type Store = {
  refresh: boolean;
  navRefresh: boolean;
  setRefresh: () => void;
  setNavRefresh: () => void;
  accessToken: boolean;
  setAccessToken: () => void;
};

export const usePage = create<Store>((set) => ({
  refresh: false,
  navRefresh: false,
  accessToken: false,
  setAccessToken: () => set((state) => ({ accessToken: !state.accessToken })),
  setRefresh: () => set((state) => ({ refresh: !state.refresh })),
  setNavRefresh: () => set((state) => ({ navRefresh: !state.navRefresh })),
}));
