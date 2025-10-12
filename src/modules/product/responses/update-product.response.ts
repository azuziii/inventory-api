import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { UpdateProductUnion } from '../unions/update-product.union';

export type UpdateProductResponse = InstanceOfBaseResponse<UpdateProductUnion>;
export const UpdateProductResponse = BaseResponse<UpdateProductUnion>(
  'UpdateProductResponse',
  UpdateProductUnion,
);
