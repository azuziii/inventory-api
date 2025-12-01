import { createUnionType } from '@nestjs/graphql';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import {
  CustomerAlreadyExist,
  CustomerNotFound,
} from '../errors/customer.error';
import { CustomerOutput } from '../outputs/customer.output';

export type UpdateCustomerUnion = typeof UpdateCustomerUnion;
export const UpdateCustomerUnion = createUnionType({
  name: 'UpdateCustomerUnion',
  types: () => [
    CustomerOutput,
    CustomerNotFound,
    CustomerAlreadyExist,
    InvalidDataException,
  ],
});
