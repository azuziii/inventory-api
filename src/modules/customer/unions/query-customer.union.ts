import { createUnionType } from '@nestjs/graphql';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { CustomerNotFound } from '../errors/customer.error';
import { CustomerOutput } from '../outputs/customer.output';

export type CustomerQueryUnion = typeof CustomerQueryUnion;
export const CustomerQueryUnion = createUnionType({
  name: 'CustomerQueryUnion',
  types: () => [CustomerOutput, CustomerNotFound, InvalidDataException],
});
