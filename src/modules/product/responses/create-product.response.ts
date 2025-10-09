import { BaseResponse } from 'src/shared/responses/base.response';
import { CreateProductUnion } from '../unions/create-product.union';

export type CreateProductResponse = typeof CreateProductResponse;
export const CreateProductResponse = BaseResponse(
  'CreateProductResponse',
  CreateProductUnion,
);
