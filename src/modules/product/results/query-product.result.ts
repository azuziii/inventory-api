import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';
import { Product } from '../entities/product.entity';
import { ProductNotFound } from '../errors/product.error';

export const ProductQueryResult = createUnionType({
  name: 'ProductQueryResult',
  types: () => [Product, ProductNotFound, InvalidData],
});
