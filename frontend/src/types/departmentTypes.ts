export type Department = {
  id: number;
  general_number: number;
  city: string;
  capacity: number;
  staff_count: number;
  status: boolean;
};

export type CreateDepartment = {
  general_number: number;
  city: string;
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
  city: string;
  lat: string;
  lng: string;
  country: string;
  iso2: string;
  admin_name: string;
  capital: string;
  population: string;
  population_proper: string;
};
