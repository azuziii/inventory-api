import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/shared/errors/invalid-data.error';
import { OrderItem } from '../entities/order-item.entity';

export type CreateOrderItemUnion = typeof CreateOrderItemUnion;
export const CreateOrderItemUnion = createUnionType({
  name: 'CreateOrderItemUnion',
  types: () => [OrderItem, InvalidData],
});
