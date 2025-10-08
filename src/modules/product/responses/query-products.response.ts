import { BaseResponse } from 'src/common/responses/base.response';
import { ProductsQueryUnion } from '../unions/query-customers.union';

export type ProductsQueryResponse = typeof ProductsQueryResponse;
export const ProductsQueryResponse = BaseResponse(
  'ProductsQueryResponse',
  ProductsQueryUnion,
);
