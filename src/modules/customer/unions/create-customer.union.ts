import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';
import { Customer } from '../entities/customer.entity';
import { CustomerAlreadyExist } from '../errors/customer.error';

export const CreateCustomerUnion = createUnionType({
  name: 'CreateCustomerUnion',
  types: () => [Customer, CustomerAlreadyExist, InvalidData],
});
