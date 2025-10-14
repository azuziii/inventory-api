import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { UpdateOrderItemUnion } from '../unions/update-order-item.union';

export type UpdateOrderItemResponse =
  InstanceOfBaseResponse<UpdateOrderItemUnion>;
export const UpdateOrderItemResponse = BaseResponse<UpdateOrderItemUnion>(
  'UpdateOrderItemResponse',
  UpdateOrderItemUnion,
);
