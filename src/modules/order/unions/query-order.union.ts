import { createUnionType } from '@nestjs/graphql';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { OrderNotFound } from '../errors/order.error';
import { OrderOutput } from '../outputs/order.output';

export type OrderQueryUnion = typeof OrderQueryUnion;
export const OrderQueryUnion = createUnionType({
  name: 'OrderQueryUnion',
  types: () => [OrderOutput, OrderNotFound, InvalidDataException],
});
