import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { CreateCustomerUnion } from '../unions/create-customer.union';

export type CreateCustomerResponse =
  InstanceOfBaseResponse<CreateCustomerUnion>;
export const CreateCustomerResponse = BaseResponse<CreateCustomerUnion>(
  'CreateCustomerResponse',
  CreateCustomerUnion,
);
