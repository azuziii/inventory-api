import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { UpdateOrderUnion } from '../unions/update-order.union';

export type UpdateOrderResponse = InstanceOfBaseResponse<UpdateOrderUnion>;
export const UpdateOrderResponse = BaseResponse<UpdateOrderUnion>(
  'UpdateOrderResponse',
  UpdateOrderUnion,
);
