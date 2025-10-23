import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseRepositoty } from 'src/shared/base/repository';
import { CustomerNotFound } from 'src/shared/domain-errors';
import { EntityManager } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { OrderAlreadyExist } from './errors/order.error';

@Injectable()
export class OrderRepository extends BaseRepositoty<Order> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Order, entityManager);
  }

  async insertOrder(
    order: CreateOrderDto,
    entityManager?: EntityManager,
  ): Promise<Order> {
    const manager = this.getManager(entityManager);
    const newOrder = this.create(order);

    try {
      const {
        identifiers: [{ id }],
      } = await manager.insert(Order, newOrder);
      return manager.findOne(Order, {
        where: {
          id,
        },
      }) as Promise<Order>;
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  async updateOrder(
    { id, ...updateOrderDto }: UpdateOrderDto,
    entityManager?: EntityManager,
  ): Promise<Order> {
    try {
      const manager = this.getManager(entityManager);

      await manager.update(Order, id, updateOrderDto);
      return manager.findOne(Order, {
        where: { id },
      }) as Promise<Order>;
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  protected translateDatabaseError(error: any, entity?: Partial<Order>): void {
    switch (error.driverError.constraint) {
      case 'UQ_ORDER_NUMBER_YEAR':
        throw new OrderAlreadyExist({
          field: 'order_number',
        });
      case 'FK_CUSTOMER':
        throw new CustomerNotFound({
          id: entity!.customer_id,
        });
      default:
        console.error(error);
        throw new InternalServerErrorException();
    }
  }
}
