import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';
import { ProductList } from '../outputs/query-products.output';

export const ProductsQueryUnion = createUnionType({
  name: 'ProductsQueryUnion',
  types: () => [ProductList, InvalidData],
});
