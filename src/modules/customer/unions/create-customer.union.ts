import { createUnionType } from '@nestjs/graphql';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { CustomerAlreadyExist } from '../errors/customer.error';
import { CustomerOutput } from '../outputs/customer.output';

export type CreateCustomerUnion = typeof CreateCustomerUnion;
export const CreateCustomerUnion = createUnionType({
  name: 'CreateCustomerUnion',
  types: () => [CustomerOutput, CustomerAlreadyExist, InvalidDataException],
});
