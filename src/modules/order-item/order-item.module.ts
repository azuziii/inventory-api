import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemSubscriber } from './entities/order-item.subscriber';
import { IOrderItem } from './interfaces/order-item.interface';
import { UpdateTotalShippedListener } from './listeners/order-item-update-total-shipped.listener';
import { OrderItemRepository } from './order-item.repository';
import { OrderItemResolver } from './order-item.resolver';
import { OrderItemService } from './order-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem]), ProductModule],
  providers: [
    OrderItemResolver,
    OrderItemService,
    OrderItemRepository,
    OrderItemSubscriber,
    UpdateTotalShippedListener,
    {
      provide: IOrderItem,
      useExisting: OrderItemService,
    },
  ],
  exports: [IOrderItem],
})
export class OrderItemModule {}
