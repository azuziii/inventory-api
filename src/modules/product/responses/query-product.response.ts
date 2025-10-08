import { BaseResponse } from 'src/common/responses/base.response';
import { ProductQueryUnion } from '../unions/query-product.union';

export type ProductQueryResponse = typeof ProductQueryResponse;
export const ProductQueryResponse = BaseResponse(
  'ProductQueryResponse',
  ProductQueryUnion,
);
