import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from '../customer/customer.module';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CustomerModule],
  providers: [OrderResolver, OrderService, OrderRepository],
})
export class OrderModule {}
