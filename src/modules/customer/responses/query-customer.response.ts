import { BaseResponse } from 'src/shared/responses/base.response';
import { CustomerQueryUnion } from '../unions/query-customer.union';

export type CustomerQueryResponse = typeof CustomerQueryResponse;
export const CustomerQueryResponse = BaseResponse(
  'CustomerQueryResponse',
  CustomerQueryUnion,
);
