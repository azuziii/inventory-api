import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreateOrderItemDto, UpdateOrderItemDto } from './dto/order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemNotFound } from './errors/order-item.error';
import { OrderItemRepository } from './order-item.repository';
import { CreateOrderItemUnion } from './unions/create-order-item.union';
import { UpdateOrderItemUnion } from './unions/update-order-item.union';

@Injectable()
export class OrderItemService {
  constructor(
    private readonly repo: OrderItemRepository,
    private readonly datasource: DataSource,
  ) {}

  createOrderItem(
    orderItemDto: CreateOrderItemDto,
  ): Promise<CreateOrderItemUnion> {
    return this.datasource.transaction(async (entityManager: EntityManager) => {
      const orderItem = await this.repo.insertOrderItem(
        orderItemDto,
        entityManager,
      );

      return orderItem;
    });
  }

  createOrderItemWithTransaction(
    orderItemDto: CreateOrderItemDto,
    entityManager: EntityManager,
  ): Promise<OrderItem> {
    return this.repo.insertOrderItem(orderItemDto, entityManager);
  }

  updateOrderItem(
    orderItemDto: UpdateOrderItemDto,
  ): Promise<UpdateOrderItemUnion> {
    return this.datasource.transaction(async (entityManager: EntityManager) => {
      const orderItem = await entityManager.findOne(OrderItem, {
        where: { id: orderItemDto.id },
      });

      if (!orderItem) {
        throw new OrderItemNotFound({
          id: orderItemDto.id,
        });
      }

      const updatedOrderItem = await this.repo.updateOrderItem(
        orderItemDto,
        orderItem,
        entityManager,
      );
      return updatedOrderItem;
    });
  }

  async getOrderItemOrFail(id: string): Promise<OrderItem> {
    const orderItem = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!orderItem) {
      throw new OrderItemNotFound({
        id,
      });
    }

    return orderItem;
  }
}
