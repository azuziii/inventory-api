import { Inject, Injectable } from '@nestjs/common';
import { DeleteResponse } from 'src/shared/responses/delete.response';
import { DataSource, FindManyOptions } from 'typeorm';
import { IOrderItem } from '../order-item/interfaces/order-item.interface';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { OrderNotFound } from './errors/order.error';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly repo: OrderRepository,
    private readonly datasource: DataSource,
    @Inject(IOrderItem) private readonly orderItemService: IOrderItem,
  ) {}

  createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.datasource.transaction(async (entityManager) => {
      const order = await this.repo.insertOrder(createOrderDto, entityManager);

      const itemsPormises = createOrderDto.items.map((item) => {
        Object.assign(item, {
          order_id: order.id,
        });
        return this.orderItemService.createOrderItemWithTransaction(
          item,
          entityManager,
        );
      });

      await Promise.all(itemsPormises);

      return order;
    });
  }

  updateOrder(orderDto: UpdateOrderDto): Promise<Order> {
    return this.datasource.transaction(async (entityManager) => {
      const order = await entityManager.findOne(Order, {
        where: { id: orderDto.id },
      });

      if (!order) {
        throw new OrderNotFound({
          id: orderDto.id,
        });
      }

      return this.repo.updateOrder(orderDto, order, entityManager);
    });
  }

  async getOrderOrFail(id: string): Promise<Order> {
    const order = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!order) {
      throw new OrderNotFound({
        id,
      });
    }

    return order;
  }

  listOrders(options: FindManyOptions<Order>): Promise<[Order[], number]> {
    return this.repo.findAndCount(options);
  }

  async deleteOrder(id: string): Promise<DeleteResponse> {
    await this.repo.deleteOrder(id);
    return new DeleteResponse(id);
  }
}
