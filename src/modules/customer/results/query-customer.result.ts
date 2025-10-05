import { createUnionType } from '@nestjs/graphql';
import { Customer } from '../entities/customer.entity';
import { NotFound } from 'src/common/errors/not-found.error';
import { InvalidData } from 'src/common/errors/invalid-data.error';

export const CustomerQueryResult = createUnionType({
  name: 'CustomerQueryResult',
  types: () => [Customer, NotFound, InvalidData],
});
