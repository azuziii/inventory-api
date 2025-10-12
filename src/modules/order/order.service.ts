import { Injectable } from '@nestjs/common';
import { DataSource, FindManyOptions } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { OrderNotFound } from './errors/order.error';
import { OrderRepository } from './order.repository';
import { OrderQueryUnion } from './unions/query-order.union';
import { UpdateOrderUnion } from './unions/update-order.union';

@Injectable()
export class OrderService {
  constructor(
    private readonly repo: OrderRepository,
    private readonly datasource: DataSource,
  ) {}

  createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.datasource.transaction(async (entityManager) => {
      return this.repo.createOrder(createOrderDto, entityManager);
    });
  }

  async getOrderOrFail(id: string): Promise<OrderQueryUnion> {
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

  async updateOrder(orderDto: UpdateOrderDto): Promise<UpdateOrderUnion> {
    return this.datasource.transaction(async (entityManager) => {
      const order = await entityManager.findOne(Order, {
        where: { id: orderDto.id },
      });

      if (!order) {
        throw new OrderNotFound({
          id: orderDto.id,
        });
      }

      const updatedOrder = await this.repo.updateOrder(orderDto, entityManager);
      return updatedOrder;
    });
  }

  listOrders(options: FindManyOptions<Order>): Promise<[Order[], number]> {
    return this.repo.findAndCount(options);
  }
}
