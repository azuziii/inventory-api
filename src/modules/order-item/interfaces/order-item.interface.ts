import { EntityManager } from 'typeorm';
import { CreateOrderItemDto } from '../dto/order-item.dto';
import { OrderItem } from '../entities/order-item.entity';

export const IOrderItem = 'IOrderItem';

export interface IOrderItem {
  createOrderItemWithTransaction(
    orderItemDto: CreateOrderItemDto,
    entityManager: EntityManager,
  ): Promise<OrderItem>;
}
