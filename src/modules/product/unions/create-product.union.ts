import { createUnionType } from '@nestjs/graphql';
import { CustomerNotFound } from 'src/modules/customer/errors/customer.error';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { ProductAlreadyExist } from '../errors/product.error';
import { ProductOutput } from '../outputs/product.output';

export type CreateProductUnion = typeof CreateProductUnion;
export const CreateProductUnion = createUnionType({
  name: 'CreateProductUnion',
  types: () => [
    ProductOutput,
    ProductAlreadyExist,
    CustomerNotFound,
    InvalidDataException,
  ],
});
