export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  status: boolean;
  stock: {
    size: string;
    qty: number;
  }[];
  created_at: Date;
  updated_at: Date;
};
