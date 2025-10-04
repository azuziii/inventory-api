import { createUnionType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { NotFound } from 'src/common/errors/not-found.error';
import { AlreadyExist } from 'src/common/errors/already-exist.error';
import { CustomerNotFound } from 'src/modules/customer/errors/customer.error';
import { InvalidData } from 'src/common/errors/invalid-data.error';

export const UpdateProductResult = createUnionType({
  name: 'UpdateProductResult',
  types: () => [Product, NotFound, AlreadyExist, CustomerNotFound, InvalidData],
  resolveType: (
    value: Product | NotFound | AlreadyExist | CustomerNotFound | InvalidData,
  ) => {
    switch (value.constructor['__typename']) {
      case 'NotFound':
        return NotFound;
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
