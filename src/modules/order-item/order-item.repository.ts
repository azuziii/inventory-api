import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseRepositoty } from 'src/shared/base/repository';
import { ProductNotFound } from 'src/shared/domain-errors';
import { EntityManager } from 'typeorm';
import { CreateOrderItemDto } from './dto/order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemRepository extends BaseRepositoty<OrderItem> {
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
      throw this.handleDatabaseError(error);
    }
  }

  protected translateDatabaseError(
    error: any,
    entity?: Partial<OrderItem>,
  ): void {
    switch (error.driverError.constraint) {
      case 'FK_PRODUCT':
        throw new ProductNotFound({
          id: entity!.product_id,
        });
      default:
        console.error(error);
        throw new InternalServerErrorException();
    }
  }
}
