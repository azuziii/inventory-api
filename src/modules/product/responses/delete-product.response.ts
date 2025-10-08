import { BaseResponse } from 'src/common/responses/base.response';
import { DeleteProductUnion } from '../unions/delete-product.union';

export type DeleteProductResponse = typeof DeleteProductResponse;
export const DeleteProductResponse = BaseResponse(
  'DeleteProductResponse',
  DeleteProductUnion,
);
