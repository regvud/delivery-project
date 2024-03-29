import { Delivery } from './deliveryTypes';

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
  sending: Delivery[];
  receiving: Delivery[];
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

type IsActive = { dataType: 'IsActive'; is_active: boolean };
type IsStaff = { dataType: 'IsStaff'; is_staff: boolean };
type IsSuperuser = { dataType: 'IsSuperuser'; is_superuser: boolean };

export type PatchData = IsActive | IsStaff | IsSuperuser;
