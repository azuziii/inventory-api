import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';
import { NotFound } from 'src/common/errors/not-found.error';
import { Product } from '../entities/product.entity';

export const ProductQueryResult = createUnionType({
  name: 'ProductQueryResult',
  types: () => [Product, NotFound, InvalidData],
});
