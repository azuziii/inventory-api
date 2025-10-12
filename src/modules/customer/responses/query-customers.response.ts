import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { CustomersQueryUnion } from '../unions/query-customers.union';

export type CustomersQueryResponse =
  InstanceOfBaseResponse<CustomersQueryUnion>;
export const CustomersQueryResponse = BaseResponse<CustomersQueryUnion>(
  'CustomersQueryResponse',
  CustomersQueryUnion,
);
