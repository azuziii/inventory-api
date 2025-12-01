import { createUnionType } from '@nestjs/graphql';
import {
  OrderNotFound,
  ProductForbiddenRelation,
} from 'src/shared/domain-errors';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { OrderItemNotFound } from '../errors/order-item.error';
import { OrderItemOutput } from '../outputs/order-item.output';

export type UpdateOrderItemUnion = typeof UpdateOrderItemUnion;
export const UpdateOrderItemUnion = createUnionType({
  name: 'UpdateOrderItemUnion',
  types: () => [
    OrderItemOutput,
    OrderItemNotFound,
    InvalidDataException,
    OrderNotFound,
    ProductForbiddenRelation,
  ],
});
