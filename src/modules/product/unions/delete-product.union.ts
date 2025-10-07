import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';
import { DeleteResponse } from 'src/common/responses/delete.response';
import { ProductInUse } from '../errors/product.error';

export const DeleteProductUnion = createUnionType({
  name: 'DeleteProductUnion',
  types: () => [DeleteResponse, ProductInUse, InvalidData],
});
