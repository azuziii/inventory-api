import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';
import { CustomerList } from '../outputs/query-customers.output';

export type CustomersQueryUnion = typeof CustomersQueryUnion;
export const CustomersQueryUnion = createUnionType({
  name: 'CustomersQueryUnion',
  types: () => [CustomerList, InvalidData],
});
