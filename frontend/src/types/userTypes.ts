import { Item } from './itemTypes';

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  email: string;
  phone: string;
  password: string;
};

export type Avatar = {
  id: number;
  avatar: string;
  user_id: number;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: number;
  email: string;
  phone: string;
  avatar: Avatar[];
  last_login: string;
};

export type User = {
  id: number;
  email: string;
  phone: string;
  avatar: Avatar[];
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  sending: Item[];
  receiving: Item[];
  last_login: string;
  created_at: string;
  updated_at: string;
};

export type UserResponse = {
  total_pages: number;
  next: string;
  prev: string;
  results: User[];
};
