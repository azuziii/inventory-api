import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { UpdateCustomerUnion } from '../unions/update-customer.union';

export type UpdateCustomerResponse =
  InstanceOfBaseResponse<UpdateCustomerUnion>;
export const UpdateCustomerResponse = BaseResponse<UpdateCustomerUnion>(
  'UpdateCustomerResponse',
  UpdateCustomerUnion,
);
