export type Department = {
  id: number;
  general_number: number;
  city: string;
  region: string;
  capacity: number;
  staff_count: number;
  status: boolean;
};

export type CreateDepartment = {
  general_number: number;
  city: string;
  region: string;
  capacity: number;
  staff_count: number;
  status: boolean;
};

export type DepartmentNumber = {
  general_number: number;
  city: string;
};

export type Regions = {
  regions: string[];
};

export type City = {
  objectId: string;
  name: string;
  country: string;
  population: number;
  createdAt: string;
  updatedAt: string;
};

export type Cities = {
  results: City[];
};
