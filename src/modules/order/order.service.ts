import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { OrderNotFound } from './errors/order.error';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly repo: OrderRepository,
    private readonly datasource: DataSource,
  ) {}

  createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.datasource.transaction((entityManager) => {
      return this.repo.insertOrder(createOrderDto, entityManager);
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
}
