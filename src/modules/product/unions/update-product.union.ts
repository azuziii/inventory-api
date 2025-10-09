import { createUnionType } from '@nestjs/graphql';
import { CustomerNotFound } from 'src/modules/customer/errors/customer.error';
import { InvalidData } from 'src/shared/errors/invalid-data.error';
import { Product } from '../entities/product.entity';
import { ProductAlreadyExist, ProductNotFound } from '../errors/product.error';

export type UpdateProductUnion = typeof UpdateProductUnion;
export const UpdateProductUnion = createUnionType({
  name: 'UpdateProductUnion',
  types: () => [
    Product,
    ProductNotFound,
    ProductAlreadyExist,
    CustomerNotFound,
    InvalidData,
  ],
});
