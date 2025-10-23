import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreateOrderItemDto } from './dto/order-item.dto';
import { OrderItemRepository } from './order-item.repository';
import { CreateOrderItemUnion } from './unions/create-order-item.union';

@Injectable()
export class OrderItemService {
  constructor(
    private readonly repo: OrderItemRepository,
    private readonly datasource: DataSource,
  ) {}

  async createOrderItem(
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
}
