import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { OrdersQueryUnion } from '../unions/query-orders.union';

export type OrdersQueryResponse = InstanceOfBaseResponse<OrdersQueryUnion>;
export const OrdersQueryResponse = BaseResponse<OrdersQueryUnion>(
  'OrdersQueryResponse',
  OrdersQueryUnion,
);
