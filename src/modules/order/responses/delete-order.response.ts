import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { DeleteOrderUnion } from '../unions/delete-order.union';

export type DeleteOrderResponse = InstanceOfBaseResponse<DeleteOrderUnion>;
export const DeleteOrderResponse = BaseResponse<DeleteOrderUnion>(
  'DeleteOrderResponse',
  DeleteOrderUnion,
);
