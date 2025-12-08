import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseRepositoty } from 'src/shared/base/repository';
import { CustomerNotFound } from 'src/shared/domain-errors';
import { EntityManager } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { OrderAlreadyExist, OrderInUse } from './errors/order.error';

@Injectable()
export class OrderRepository extends BaseRepositoty<
  Order,
  Omit<CreateOrderDto, 'items'>,
  UpdateOrderDto
> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Order, entityManager);
  }

  insertOrder(
    { items, ...order }: CreateOrderDto,
    entityManager?: EntityManager,
  ): Promise<Order> {
    return this.insertOne(order, entityManager);
  }

  updateOrder(
    { id, ...updateOrderDto }: UpdateOrderDto,
    order: Order,
    entityManager?: EntityManager,
  ): Promise<Order> {
    Object.assign(order, updateOrderDto);
    return this.updateOne(order, entityManager);
  }

  deleteOrder(id: string): Promise<void> {
    return this.deleteOne(id);
  }

  protected translateDatabaseError(
    error: any,
    entity?: CreateOrderDto | UpdateOrderDto | Partial<Order>,
  ): void {
    switch (error.driverError.constraint) {
      case 'UQ_ORDER_NUMBER_YEAR':
        throw new OrderAlreadyExist({
          field: 'order_number',
        });
      case 'FK_CUSTOMER':
        throw new CustomerNotFound({
          id: entity!.customer_id,
        });
      case 'FK_ORDER':
        throw new OrderInUse({
          resourceName: 'order_item',
        });
      default:
        console.error(error);
        throw new InternalServerErrorException();
    }
  }
}
