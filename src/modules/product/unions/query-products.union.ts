import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';
import { ProductList } from '../outputs/product-list.output';

export type ProductsQueryUnion = typeof ProductsQueryUnion;
export const ProductsQueryUnion = createUnionType({
  name: 'ProductsQueryUnion',
  types: () => [ProductList, InvalidData],
});
