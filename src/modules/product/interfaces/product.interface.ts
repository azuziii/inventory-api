import { Product } from '../entities/product.entity';

export const IProduct = 'IProduct';

export interface IProduct {
  getProductOrFail(id: string): Promise<Product>;
}
