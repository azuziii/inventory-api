import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/shared/errors/invalid-data.error';
import { DeleteResponse } from 'src/shared/responses/delete.response';
import { CustomerInUse } from '../errors/customer.error';

export type DeleteCustomerUnion = typeof DeleteCustomerUnion;
export const DeleteCustomerUnion = createUnionType({
  name: 'DeleteCustomerUnion',
  types: () => [DeleteResponse, CustomerInUse, InvalidData],
});
