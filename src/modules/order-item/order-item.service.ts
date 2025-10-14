import { Injectable } from '@nestjs/common';
import { DeleteResponse } from 'src/shared/responses/delete.response';
import { DataSource, EntityManager } from 'typeorm';
import { CreateOrderItemDto, UpdateOrderItemDto } from './dto/order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemNotFound } from './errors/order-item.error';
import { OrderItemRepository } from './order-item.repository';
import { CreateOrderItemUnion } from './unions/create-order-item.union';
import { OrderItemQueryUnion } from './unions/query-order-item.union';
import { UpdateOrderItemUnion } from './unions/update-order-item.union';

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
      const orderItem = await this.repo.createOrderItem(
        orderItemDto,
        entityManager,
      );

      return orderItem;
    });
  }

  async updateOrderItem(
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
        entityManager,
      );
      return updatedOrderItem;
    });
  }

  async getOrderItemOrFail(id: string): Promise<OrderItemQueryUnion> {
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

  async deleteOrderItem(id: string): Promise<DeleteResponse> {
    await this.repo.deleteOrderItem(id);
    return new DeleteResponse(id);
  }
}
