import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';
import { NotFound } from 'src/common/errors/not-found.error';
import { Customer } from '../entities/customer.entity';

export const CustomerQueryResult = createUnionType({
  name: 'CustomerQueryResult',
  types: () => [Customer, NotFound, InvalidData],
});
