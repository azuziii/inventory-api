import { createUnionType } from '@nestjs/graphql';
import { CustomerNotFound } from 'src/modules/customer/errors/customer.error';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { Product } from '../entities/product.entity';
import { ProductAlreadyExist } from '../errors/product.error';

export type CreateProductUnion = typeof CreateProductUnion;
export const CreateProductUnion = createUnionType({
  name: 'CreateProductUnion',
  types: () => [
    Product,
    ProductAlreadyExist,
    CustomerNotFound,
    InvalidDataException,
  ],
});
