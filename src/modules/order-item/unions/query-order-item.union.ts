import { createUnionType } from '@nestjs/graphql';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { OrderItemNotFound } from '../errors/order-item.error';
import { OrderItemOutput } from '../outputs/order-item.output';

export type OrderItemQueryUnion = typeof OrderItemQueryUnion;
export const OrderItemQueryUnion = createUnionType({
  name: 'OrderItemQueryUnion',
  types: () => [OrderItemOutput, OrderItemNotFound, InvalidDataException],
});
