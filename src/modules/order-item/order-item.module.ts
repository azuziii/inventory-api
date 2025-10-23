import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemRepository } from './order-item.repository';
import { OrderItemResolver } from './order-item.resolver';
import { OrderItemService } from './order-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  providers: [OrderItemResolver, OrderItemService, OrderItemRepository],
})
export class OrderItemModule {}
