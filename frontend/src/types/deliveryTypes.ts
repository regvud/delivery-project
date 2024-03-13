import { Item } from './itemTypes';

export type Delivery = {
  id: number;
  item: Item;
  sender: number;
  receiver: number;
  department: number;
  status: string;
};

export type AdminDelivery = {
  id: number;
  item: {
    id: number;
    label: string;
  };
  sender: {
    id: number;
    email: string;
    phone: string;
  };
  receiver: {
    id: number;
    email: string;
    phone: string;
  };
  department: {
    id: number;
    general_number: number;
  };
  created_at: string;
};

export type UserDeliveriesResponse = {
  sending: Delivery[];
  receiving: Delivery[];
};
