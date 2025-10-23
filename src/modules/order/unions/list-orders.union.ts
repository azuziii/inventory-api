import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/shared/errors/invalid-data.error';
import { OrderList } from '../outputs/order-list.output';

export type OrdersQueryUnion = typeof OrdersQueryUnion;
export const OrdersQueryUnion = createUnionType({
  name: 'OrdersQueryUnion',
  types: () => [OrderList, InvalidData],
});
