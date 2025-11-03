import { createUnionType } from '@nestjs/graphql';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { Customer } from '../entities/customer.entity';
import { CustomerAlreadyExist } from '../errors/customer.error';

export type CreateCustomerUnion = typeof CreateCustomerUnion;
export const CreateCustomerUnion = createUnionType({
  name: 'CreateCustomerUnion',
  types: () => [Customer, CustomerAlreadyExist, InvalidDataException],
});
