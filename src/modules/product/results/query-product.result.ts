import { NotFound } from 'src/common/errors/not-found.error';
import { Product } from '../entities/product.entity';
import { createUnionType } from '@nestjs/graphql';

export const ProductQueryResult = createUnionType({
  name: 'ProductQueryResult',
  types: () => [Product, NotFound],
});
