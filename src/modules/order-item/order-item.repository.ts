import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseRepositoty } from 'src/shared/base/repository';
import { OrderNotFound, ProductNotFound } from 'src/shared/domain-errors';
import { EntityManager } from 'typeorm';
import { CreateOrderItemDto, UpdateOrderItemDto } from './dto/order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemRepository extends BaseRepositoty<
  OrderItem,
  CreateOrderItemDto,
  UpdateOrderItemDto
> {
  constructor(protected readonly entityManager: EntityManager) {
    super(OrderItem, entityManager);
  }

  async insertOrderItem(
    orderItemDto: CreateOrderItemDto,
    entityManager?: EntityManager,
  ): Promise<OrderItem> {
    return this.insertOne(orderItemDto, entityManager);
  }

  updateOrderItem(
    updateOrderItemDto: UpdateOrderItemDto,
    orderItem: OrderItem,
    entityManager?: EntityManager,
  ): Promise<OrderItem> {
    Object.assign(orderItem, updateOrderItemDto);
    return this.updateOne(orderItem, entityManager);
  }

  deleteOrderItem(id: string): Promise<void> {
    return this.deleteOne(id);
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
