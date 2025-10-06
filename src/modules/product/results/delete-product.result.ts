import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';
import { DeleteResponse } from 'src/common/responses/delete.response';
import { ProductInUse } from '../errors/product.error';

export const DeleteProductResult = createUnionType({
  name: 'DeleteProductResult',
  types: () => [DeleteResponse, ProductInUse, InvalidData],
});
