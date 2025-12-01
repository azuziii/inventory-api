import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseRepositoty } from 'src/shared/base/repository';
import { OrderNotFound, ProductNotFound } from 'src/shared/domain-errors';
import { EntityManager } from 'typeorm';
import { CreateOrderItemDto, UpdateOrderItemDto } from './dto/order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemRepository extends BaseRepositoty<
  OrderItem,
  CreateOrderItemDto | UpdateOrderItemDto
> {
  constructor(protected readonly entityManager: EntityManager) {
    super(OrderItem, entityManager);
  }

  async insertOrderItem(
    orderItemDto: CreateOrderItemDto,
    entityManager?: EntityManager,
  ): Promise<OrderItem> {
    const manager = this.getManager(entityManager);
    const orderItem = this.create(orderItemDto);
    try {
      const {
        identifiers: [{ id }],
      } = await manager.insert(OrderItem, orderItem);
      return manager.findOne(OrderItem, {
        where: {
          id,
        },
      }) as Promise<OrderItem>;
    } catch (error) {
      throw this.handleDatabaseError(error, orderItemDto);
    }
  }

  async updateOrderItem(
    { id, ...updateOrderItemDto }: UpdateOrderItemDto,
    orderItem: OrderItem,
    entityManager?: EntityManager,
  ): Promise<OrderItem> {
    try {
      const manager = this.getManager(entityManager);
      Object.assign(orderItem, updateOrderItemDto);

      await manager.update(OrderItem, id, orderItem);
      return manager.findOne(OrderItem, {
        where: { id },
      }) as Promise<OrderItem>;
    } catch (error) {
      throw this.handleDatabaseError(error, orderItem);
    }
  }

  protected translateDatabaseError(
    error: any,
    entity?: CreateOrderItemDto | UpdateOrderItemDto | Partial<OrderItem>,
  ): void {
    switch (error.driverError.constraint) {
      case 'FK_PRODUCT_ORDER_ITEM':
        throw new ProductNotFound({
          id: entity!.product_id,
        });
      case 'FK_ORDER':
        throw new OrderNotFound({
          id: entity!.product_id,
        });
      default:
        console.error(error);
        throw new InternalServerErrorException();
    }
  }
}
