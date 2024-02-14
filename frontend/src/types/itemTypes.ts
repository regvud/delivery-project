export type Item = {
  id: number;
  label: string;
  price: string;
  size: string;
  image: Image[];
};

export type Image = {
  id: number;
  image: string;
  item_id: number;
};
