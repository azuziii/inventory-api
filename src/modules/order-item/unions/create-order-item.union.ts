import { createUnionType } from '@nestjs/graphql';
import {
  OrderNotFound,
  ProductForbiddenRelation,
  ProductNotFound,
} from 'src/shared/domain-errors';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { OrderItemOutput } from '../outputs/order-item.output';

export type CreateOrderItemUnion = typeof CreateOrderItemUnion;
export const CreateOrderItemUnion = createUnionType({
  name: 'CreateOrderItemUnion',
  types: () => [
    OrderItemOutput,
    InvalidDataException,
    ProductNotFound,
    OrderNotFound,
    ProductForbiddenRelation,
  ],
});
