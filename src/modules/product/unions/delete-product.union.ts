import { createUnionType } from '@nestjs/graphql';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { DeleteResponse } from 'src/shared/responses/delete.response';
import { ProductInUse } from '../errors/product.error';

export type DeleteProductUnion = typeof DeleteProductUnion;
export const DeleteProductUnion = createUnionType({
  name: 'DeleteProductUnion',
  types: () => [DeleteResponse, ProductInUse, InvalidDataException],
});
