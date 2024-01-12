import { Item } from './itemTypes';

export type Delivery = {
  id: number;
  item: Item;
  sender: number;
  receiver: number;
  department: number;
  status: string;
};

export type UserDeliveriesResponse = {
  sending: Delivery[];
  receiving: Delivery[];
};
