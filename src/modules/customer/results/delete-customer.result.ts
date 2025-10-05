import { createUnionType } from '@nestjs/graphql';
import { DeleteResponse } from 'src/common/responses/delete.response';
import { InUse } from 'src/common/errors/in-use.error';
import { InvalidData } from 'src/common/errors/invalid-data.error';

export const DeleteCustomerResult = createUnionType({
  name: 'DeleteCustomerResult',
  types: () => [DeleteResponse, InUse, InvalidData],
});
