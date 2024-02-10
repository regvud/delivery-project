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
};

export type Profile = {
  email: string;
  phone: string;
  avatar: [Avatar];
  last_login: string;
};
