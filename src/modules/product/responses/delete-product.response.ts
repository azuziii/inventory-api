import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { DeleteProductUnion } from '../unions/delete-product.union';

export type DeleteProductResponse = InstanceOfBaseResponse<DeleteProductUnion>;
export const DeleteProductResponse = BaseResponse<DeleteProductUnion>(
  'DeleteProductResponse',
  DeleteProductUnion,
);
