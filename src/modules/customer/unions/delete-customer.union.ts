import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';
import { DeleteResponse } from 'src/common/responses/delete.response';
import { CustomerInUse } from '../errors/customer.error';

export const DeleteCustomerUnion = createUnionType({
  name: 'DeleteCustomerUnion',
  types: () => [DeleteResponse, CustomerInUse, InvalidData],
});
