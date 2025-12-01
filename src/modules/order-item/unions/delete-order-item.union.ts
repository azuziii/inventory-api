import { createUnionType } from '@nestjs/graphql';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { DeleteResponse } from 'src/shared/responses/delete.response';

export type DeleteOrderItemUnion = typeof DeleteOrderItemUnion;
export const DeleteOrderItemUnion = createUnionType({
  name: 'DeleteOrderItemUnion',
  types: () => [DeleteResponse, InvalidDataException],
});
