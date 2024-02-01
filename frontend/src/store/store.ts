import { create } from 'zustand';

type Store = {
  refresh: boolean;
  setRefresh: () => void;
  accessToken: boolean;
  setAccessToken: () => void;
};

export const usePage = create<Store>((set) => ({
  refresh: false,
  accessToken: false,
  setAccessToken: () => set((state) => ({ accessToken: !state.accessToken })),
  setRefresh: () => set((state) => ({ refresh: !state.refresh })),
}));
