import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { ProductsQueryUnion } from '../unions/query-products.union';

export type ProductsQueryResponse = InstanceOfBaseResponse<ProductsQueryUnion>;
export const ProductsQueryResponse = BaseResponse<ProductsQueryUnion>(
  'ProductsQueryResponse',
  ProductsQueryUnion,
);
