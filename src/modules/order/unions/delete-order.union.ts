import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/shared/errors/invalid-data.error';
import { DeleteResponse } from 'src/shared/responses/delete.response';
import { OrderAlreadyExist, OrderInUse } from '../errors/order.error';

export type DeleteOrderUnion = typeof DeleteOrderUnion;
export const DeleteOrderUnion = createUnionType({
  name: 'DeleteOrderUnion',
  types: () => [DeleteResponse, OrderInUse, OrderAlreadyExist, InvalidData],
});
