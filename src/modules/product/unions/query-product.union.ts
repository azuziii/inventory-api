import { createUnionType } from '@nestjs/graphql';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { ProductNotFound } from '../errors/product.error';
import { ProductOutput } from '../outputs/product.output';

export type ProductQueryUnion = typeof ProductQueryUnion;
export const ProductQueryUnion = createUnionType({
  name: 'ProductQueryUnion',
  types: () => [ProductOutput, ProductNotFound, InvalidDataException],
});
