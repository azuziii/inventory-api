import { BaseResponse } from 'src/common/responses/base.response';
import { DeleteCustomerUnion } from '../unions/delete-customer.union';

export type DeleteCustomerResponse = typeof DeleteCustomerResponse;
export const DeleteCustomerResponse = BaseResponse(
  'DeleteCustomerResponse',
  DeleteCustomerUnion,
);
