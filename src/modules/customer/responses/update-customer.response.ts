import { BaseResponse } from 'src/common/responses/base.response';
import { UpdateCustomerUnion } from '../unions/update-customer.union';

export type UpdateCustomerResponse = typeof UpdateCustomerResponse;
export const UpdateCustomerResponse = BaseResponse(
  'UpdateCustomerResponse',
  UpdateCustomerUnion,
);
