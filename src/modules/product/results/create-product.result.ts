import { AlreadyExist } from 'src/common/errors/already-exist.error';
import { Product } from '../entities/product.entity';
import { CustomerNotFound } from 'src/modules/customer/errors/customer.error';
import { createUnionType } from '@nestjs/graphql';

export const CreateProductResult = createUnionType({
  name: 'CreateProductResult',
  types: () => [Product, AlreadyExist, CustomerNotFound],
});
