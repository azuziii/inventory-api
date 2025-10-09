import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/shared/errors/invalid-data.error';
import { Customer } from '../entities/customer.entity';
import { CustomerNotFound } from '../errors/customer.error';

export type CustomerQueryUnion = typeof CustomerQueryUnion;
export const CustomerQueryUnion = createUnionType({
  name: 'CustomerQueryUnion',
  types: () => [Customer, CustomerNotFound, InvalidData],
});
