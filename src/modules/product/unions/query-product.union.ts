import { createUnionType } from '@nestjs/graphql';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { Product } from '../entities/product.entity';
import { ProductNotFound } from '../errors/product.error';

export type ProductQueryUnion = typeof ProductQueryUnion;
export const ProductQueryUnion = createUnionType({
  name: 'ProductQueryUnion',
  types: () => [Product, ProductNotFound, InvalidDataException],
});
