import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/shared/errors/invalid-data.error';
import { Order } from '../entities/order.entity';
import { OrderAlreadyExist } from '../errors/order.error';

export type CreateOrderUnion = typeof CreateOrderUnion;
export const CreateOrderUnion = createUnionType({
  name: 'CreateOrderUnion',
  types: () => [Order, OrderAlreadyExist, InvalidData],
});
