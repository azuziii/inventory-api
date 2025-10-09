import { BaseResponse } from 'src/shared/responses/base.response';
import { UpdateCustomerUnion } from '../unions/update-customer.union';

export type UpdateCustomerResponse = typeof UpdateCustomerResponse;
export const UpdateCustomerResponse = BaseResponse(
  'UpdateCustomerResponse',
  UpdateCustomerUnion,
);
