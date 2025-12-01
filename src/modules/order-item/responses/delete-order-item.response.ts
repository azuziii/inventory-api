import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { DeleteOrderItemUnion } from '../unions/delete-order-item.union';

export type DeleteOrderItemResponse =
  InstanceOfBaseResponse<DeleteOrderItemUnion>;
export const DeleteOrderItemResponse = BaseResponse<DeleteOrderItemUnion>(
  'DeleteOrderItemResponse',
  DeleteOrderItemUnion,
);
