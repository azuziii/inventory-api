import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/shared/errors/invalid-data.error';
import { CustomerList } from '../outputs/customer-list.output';

export type CustomersQueryUnion = typeof CustomersQueryUnion;
export const CustomersQueryUnion = createUnionType({
  name: 'CustomersQueryUnion',
  types: () => [CustomerList, InvalidData],
});
