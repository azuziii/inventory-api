import { createUnionType } from '@nestjs/graphql';
import { CustomerNotFound } from 'src/modules/customer/errors/customer.error';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { ProductAlreadyExist, ProductNotFound } from '../errors/product.error';
import { ProductOutput } from '../outputs/product.output';

export type UpdateProductUnion = typeof UpdateProductUnion;
export const UpdateProductUnion = createUnionType({
  name: 'UpdateProductUnion',
  types: () => [
    ProductOutput,
    ProductNotFound,
    ProductAlreadyExist,
    CustomerNotFound,
    InvalidDataException,
  ],
});
