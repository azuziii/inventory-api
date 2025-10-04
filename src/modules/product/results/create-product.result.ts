import { AlreadyExist } from 'src/common/errors/already-exist.error';
import { Product } from '../entities/product.entity';
import { CustomerNotFound } from 'src/modules/customer/errors/customer.error';
import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';

export const CreateProductResult = createUnionType({
  name: 'CreateProductResult',
  types: () => [Product, AlreadyExist, CustomerNotFound, InvalidData],
  resolveType: (
    value: Product | AlreadyExist | CustomerNotFound | InvalidData,
  ) => {
    switch (value.constructor['__typename']) {
      case 'AlreadyExist':
        return AlreadyExist;
      case 'CustomerNotFound':
        return CustomerNotFound;
      case 'InvalidData':
        return InvalidData;
    }

    if ('price' in value) {
      return Product;
    }

    return null;
  },
});
