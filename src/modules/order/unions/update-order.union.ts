import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/shared/errors/invalid-data.error';
import { Order } from '../entities/order.entity';
import { OrderAlreadyExist, OrderNotFound } from '../errors/order.error';

export type UpdateOrderUnion = typeof UpdateOrderUnion;
export const UpdateOrderUnion = createUnionType({
  name: 'UpdateOrderUnion',
  types: () => [Order, OrderNotFound, OrderAlreadyExist, InvalidData],
});
