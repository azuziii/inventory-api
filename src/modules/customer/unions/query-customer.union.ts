import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';
import { Customer } from '../entities/customer.entity';
import { CustomerNotFound } from '../errors/customer.error';

export const CustomerQueryUnion = createUnionType({
  name: 'CustomerQueryUnion',
  types: () => [Customer, CustomerNotFound, InvalidData],
});
