import { create } from 'zustand';

type Store = {
  paginationPage: number;
  setPaginationPage: (page: number) => void;
};

export const usePage = create<Store>((set) => ({
  paginationPage: 1,
  setPaginationPage: (page: number) => set({ paginationPage: page }),
}));
