import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseError } from 'pg';
import { BaseRepositoty } from 'src/shared/base/repository';
import { EntityManager, QueryFailedError } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { OrderAlreadyExist } from './errors/order.error';

@Injectable()
export class OrderRepository extends BaseRepositoty<Order> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Order, entityManager);
  }

  async createOrder(
    order: CreateOrderDto,
    entityManager?: EntityManager,
  ): Promise<Order> {
    const manager = this.getManager(entityManager);
    const newOrder = this.create(order);

    try {
      console.log(newOrder);
      const insertResult = await manager.insert(Order, newOrder);
      return manager.findOne(Order, {
        where: {
          id: insertResult.identifiers[0].id,
        },
      }) as Promise<Order>;
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  async updateOrder(
    order: UpdateOrderDto,
    entityManager?: EntityManager,
  ): Promise<Order> {
    try {
      const manager = this.getManager(entityManager);
      await manager.update(Order, order.id, order);
      return manager.findOne(Order, {
        where: { id: order.id },
      }) as Promise<Order>;
    } catch (error) {
      throw this.handleDatabaseError(error, order);
    }
  }

  async deleteOrder(id: string): Promise<void> {
    try {
      const deleteResult = await this.delete(id);
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  protected translateDatabaseError(
    error: QueryFailedError<DatabaseError>,
    entity?: Partial<Order> | undefined,
  ): void {
    switch (error.driverError.constraint) {
      case 'UQ_ORDER_NUMBER_YEAR':
        throw new OrderAlreadyExist({
          field: 'order_number',
        });
      default:
        console.error(error);
        throw new InternalServerErrorException();
    }
  }
}
