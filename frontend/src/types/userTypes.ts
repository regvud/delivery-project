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
  avatar: string;
  id: number;
  user_id: number;
};

export type Profile = {
  email: string;
  phone: string;
  avatar: [Avatar];
  last_login: string;
};
