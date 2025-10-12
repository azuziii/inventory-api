import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { OrderQueryUnion } from '../unions/query-order.union';

export type OrderQueryResponse = InstanceOfBaseResponse<OrderQueryUnion>;
export const OrderQueryResponse = BaseResponse<OrderQueryUnion>(
  'OrderQueryResponse',
  OrderQueryUnion,
);
