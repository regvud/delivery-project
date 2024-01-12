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
