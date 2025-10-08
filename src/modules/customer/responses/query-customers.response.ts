import { BaseResponse } from 'src/common/responses/base.response';
import { CustomersQueryUnion } from '../unions/query-customers.union';

export type CustomersQueryResponse = typeof CustomersQueryResponse;
export const CustomersQueryResponse = BaseResponse(
  'CustomersQueryResponse',
  CustomersQueryUnion,
);
