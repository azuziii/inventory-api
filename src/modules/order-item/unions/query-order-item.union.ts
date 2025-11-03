import { createUnionType } from '@nestjs/graphql';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { OrderItem } from '../entities/order-item.entity';
import { OrderItemNotFound } from '../errors/order-item.error';

export type OrderItemQueryUnion = typeof OrderItemQueryUnion;
export const OrderItemQueryUnion = createUnionType({
  name: 'OrderItemQueryUnion',
  types: () => [OrderItem, OrderItemNotFound, InvalidDataException],
});
