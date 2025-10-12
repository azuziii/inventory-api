import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { CustomerQueryUnion } from '../unions/query-customer.union';

export type CustomerQueryResponse = InstanceOfBaseResponse<CustomerQueryUnion>;
export const CustomerQueryResponse = BaseResponse<CustomerQueryUnion>(
  'CustomerQueryResponse',
  CustomerQueryUnion,
);
