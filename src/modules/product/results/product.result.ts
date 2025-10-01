import { createUnionType } from '@nestjs/graphql';
import { NotFound } from 'src/common/errors/not-found.error';
import { Product } from '../entities/product.entity';
import { AlreadyExist } from 'src/common/errors/alread-exist.error';
import { CustomerNotFound } from 'src/modules/customer/errors/customer.error';

export const ProductQueryResult = createUnionType({
  name: 'ProductQueryResult',
  types: () => [Product, NotFound],
});

export const CreateProductResult = createUnionType({
  name: 'CreateProductResult',
  types: () => [Product, AlreadyExist, CustomerNotFound],
});

export const UpdateProductResult = createUnionType({
  name: 'UpdateProductResult',
  types: () => [Product, NotFound, AlreadyExist],
});
