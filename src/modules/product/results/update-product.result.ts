import { createUnionType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { NotFound } from 'src/common/errors/not-found.error';
import { AlreadyExist } from 'src/common/errors/already-exist.error';
import { CustomerNotFound } from 'src/modules/customer/errors/customer.error';

export const UpdateProductResult = createUnionType({
  name: 'UpdateProductResult',
  // TODO: Fix issue where if customer wasn't found GraphQL __typename would be NotFound, and not CustomerNotFound.
  types: () => [Product, NotFound, AlreadyExist, CustomerNotFound],
});
