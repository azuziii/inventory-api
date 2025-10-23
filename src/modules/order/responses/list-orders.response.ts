import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { OrdersQueryUnion } from '../unions/list-orders.union';

export type OrdersQueryResponse = InstanceOfBaseResponse<OrdersQueryUnion>;
export const OrdersQueryResponse = BaseResponse<OrdersQueryUnion>(
  'OrdersQueryResponse',
  OrdersQueryUnion,
);
