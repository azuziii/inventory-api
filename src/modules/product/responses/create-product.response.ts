import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { CreateProductUnion } from '../unions/create-product.union';

export type CreateProductResponse = InstanceOfBaseResponse<CreateProductUnion>;
export const CreateProductResponse = BaseResponse<CreateProductUnion>(
  'CreateProductResponse',
  CreateProductUnion,
);
