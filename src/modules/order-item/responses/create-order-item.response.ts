import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { CreateOrderItemUnion } from '../unions/create-order-item.union';

export type CreateOrderItemResponse =
  InstanceOfBaseResponse<CreateOrderItemUnion>;
export const CreateOrderItemResponse = BaseResponse<CreateOrderItemUnion>(
  'CreateOrderItemResponse',
  CreateOrderItemUnion,
);
