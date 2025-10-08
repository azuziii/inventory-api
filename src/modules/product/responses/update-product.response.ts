import { BaseResponse } from 'src/common/responses/base.response';
import { UpdateProductUnion } from '../unions/update-product.union';

export type UpdateProductResponse = typeof UpdateProductResponse;
export const UpdateProductResponse = BaseResponse(
  'UpdateProductResponse',
  UpdateProductUnion,
);
