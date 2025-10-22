import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { CreateOrderUnion } from '../unions/create-order.union';

export type CreateOrderResponse = InstanceOfBaseResponse<CreateOrderUnion>;
export const CreateOrderResponse = BaseResponse<CreateOrderUnion>(
  'CreateOrderResponse',
  CreateOrderUnion,
);
