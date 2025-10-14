import { Injectable } from '@nestjs/common';
import { DatabaseError } from 'pg';
import { BaseRepositoty } from 'src/shared/base/repository';
import { EntityManager, QueryFailedError } from 'typeorm';
import { CreateOrderItemDto, UpdateOrderItemDto } from './dto/order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemRepository extends BaseRepositoty<OrderItem> {
  constructor(readonly entityManager: EntityManager) {
    super(OrderItem, entityManager);
  }

  async createOrderItem(
    orderItem: CreateOrderItemDto,
    entityManager?: EntityManager,
  ): Promise<OrderItem> {
    const manager = this.getManager(entityManager);
    const newOrderItem = manager.create(OrderItem, orderItem);
    newOrderItem.product_name = orderItem.product.name;
    newOrderItem.product_price = orderItem.product.price;

    try {
      const insertResult = await manager.insert(OrderItem, newOrderItem);
      return manager.findOne(OrderItem, {
        where: {
          id: insertResult.identifiers[0].id,
        },
      }) as Promise<OrderItem>;
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  async updateOrderItem(
    orderItem: UpdateOrderItemDto,
    entityManager?: EntityManager,
  ): Promise<OrderItem> {
    try {
      const manager = this.getManager(entityManager);
      await manager.update(OrderItem, orderItem.id, {
        ...orderItem,
        ...(orderItem.product && {
          product_name: orderItem.product.name,
          product_price: orderItem.product.price,
        }),
      });
      return manager.findOne(OrderItem, {
        where: { id: orderItem.id },
      }) as Promise<OrderItem>;
    } catch (error) {
      throw this.handleDatabaseError(error, orderItem);
    }
  }

  protected translateDatabaseError(
    error: QueryFailedError<DatabaseError>,
    entity?: Partial<OrderItem> | undefined,
  ): void {
    console.error(error);
    throw error;
  }
}
