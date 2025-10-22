import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
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
}
