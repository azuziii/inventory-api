import { AlreadyExist } from 'src/common/errors/already-exist.error';
import { Product } from '../entities/product.entity';
import { CustomerNotFound } from 'src/modules/customer/errors/customer.error';
import { createUnionType } from '@nestjs/graphql';

export const CreateProductResult = createUnionType({
  name: 'CreateProductResult',
  types: () => [Product, AlreadyExist, CustomerNotFound],
  resolveType: (value: Product | AlreadyExist | CustomerNotFound) => {
    switch (value.constructor['__typename']) {
      case 'AlreadyExist':
        return AlreadyExist;
      case 'CustomerNotFound':
        return CustomerNotFound;
    }

    if ('price' in value) {
      return Product;
    }

    return null;
  },
});
