import { BaseResponse } from 'src/shared/responses/base.response';
import { CreateCustomerUnion } from '../unions/create-customer.union';

export type CreateCustomerResponse = typeof CreateCustomerResponse;
export const CreateCustomerResponse = BaseResponse(
  'CreateCustomerResponse',
  CreateCustomerUnion,
);
