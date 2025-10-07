import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';
import { CustomerNotFound } from 'src/modules/customer/errors/customer.error';
import { Product } from '../entities/product.entity';
import { ProductAlreadyExist } from '../errors/product.error';

export const CreateProductUnion = createUnionType({
  name: 'CreateProductUnion',
  types: () => [Product, ProductAlreadyExist, CustomerNotFound, InvalidData],
});
