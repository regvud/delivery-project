export type PaginatedResponse<T> = {
  total_pages: number;
  next: boolean;
  prev: boolean;
  results: T;
};

export type ResponseError = {
  email?: string;
  password?: string;
  detail?: string;
  phone?: string;
};
export type AuthResponse = {
  data: Tokens;
  request?: Request;
};

export type Tokens = {
  access: string;
  refresh: string;
};

export type Request = {
  status: number;
  headers: Record<string, string>;
};

export type RefreshResponse = {
  access?: string;
  refresh?: string;
  detail?: string;
  code?: string;
};
