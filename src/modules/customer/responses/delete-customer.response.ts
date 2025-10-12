import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { DeleteCustomerUnion } from '../unions/delete-customer.union';

export type DeleteCustomerResponse =
  InstanceOfBaseResponse<DeleteCustomerUnion>;
export const DeleteCustomerResponse = BaseResponse<DeleteCustomerUnion>(
  'DeleteCustomerResponse',
  DeleteCustomerUnion,
);
