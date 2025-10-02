import { createUnionType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { NotFound } from 'src/common/errors/not-found.error';
import { AlreadyExist } from 'src/common/errors/already-exist.error';
import { CustomerNotFound } from 'src/modules/customer/errors/customer.error';

export const UpdateProductResult = createUnionType({
  name: 'UpdateProductResult',
  types: () => [Product, NotFound, AlreadyExist, CustomerNotFound],
});
