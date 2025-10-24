import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/shared/errors/invalid-data.error';
import { Order } from '../entities/order.entity';
import { OrderNotFound } from '../errors/order.error';

export type OrderQueryUnion = typeof OrderQueryUnion;
export const OrderQueryUnion = createUnionType({
  name: 'OrderQueryUnion',
  types: () => [Order, OrderNotFound, InvalidData],
});
