import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { ProductQueryUnion } from '../unions/query-product.union';

export type ProductQueryResponse = InstanceOfBaseResponse<ProductQueryUnion>;
export const ProductQueryResponse = BaseResponse<ProductQueryUnion>(
  'ProductQueryResponse',
  ProductQueryUnion,
);
