import { createUnionType } from '@nestjs/graphql';
import { OrderNotFound } from 'src/shared/domain-errors';
import { InvalidData } from 'src/shared/errors/invalid-data.error';
import { OrderItem } from '../entities/order-item.entity';
import { OrderItemNotFound } from '../errors/order-item.error';

export type UpdateOrderItemUnion = typeof UpdateOrderItemUnion;
export const UpdateOrderItemUnion = createUnionType({
  name: 'UpdateOrderItemUnion',
  types: () => [OrderItem, OrderItemNotFound, InvalidData, OrderNotFound],
});
