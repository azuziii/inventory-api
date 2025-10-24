import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { OrderItemQueryUnion } from '../unions/query-order-item.union';

export type OrderItemQueryResponse =
  InstanceOfBaseResponse<OrderItemQueryUnion>;
export const OrderItemQueryResponse = BaseResponse<OrderItemQueryUnion>(
  'OrderItemQueryResponse',
  OrderItemQueryUnion,
);
