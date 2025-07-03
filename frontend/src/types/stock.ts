import type { Product } from "./product";

export type Stock = {
  id: number;
  product: Product;
  quantity: number;
  createdAt: string;
};
