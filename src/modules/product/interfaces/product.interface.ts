import { FindOneOptions } from 'typeorm';
import { Product } from '../entities/product.entity';

export const IProduct = 'IProduct';

export interface IProduct {
  getProduct(options: FindOneOptions<Product>): Promise<Product | null>;
}
