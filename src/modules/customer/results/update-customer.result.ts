import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';
import { Customer } from '../entities/customer.entity';
import {
  CustomerAlreadyExist,
  CustomerNotFound,
} from '../errors/customer.error';

export const UpdateCustomerResult = createUnionType({
  name: 'UpdateCustomerResult',
  types: () => [Customer, CustomerNotFound, CustomerAlreadyExist, InvalidData],
});
