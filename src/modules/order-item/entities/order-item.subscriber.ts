import { Inject, Injectable } from '@nestjs/common';
import { IProduct } from 'src/modules/product/interfaces/product.interface';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Injectable()
@EventSubscriber()
export class OrderItemSubscriber implements EntitySubscriberInterface {
  constructor(
    private readonly datasource: DataSource,
    @Inject(IProduct) private readonly productService: IProduct,
  ) {
    this.datasource.subscribers.push(this);
  }

  listenTo() {
    return OrderItem;
  }

  async beforeInsert(event: InsertEvent<OrderItem>): Promise<void> {
    await this.setProductProps(event);
  }

  async beforeUpdate(event: UpdateEvent<any>): Promise<void> {
    await this.setProductProps(event);
  }

  async setProductProps(event: InsertEvent<OrderItem> | UpdateEvent<any>) {
    if (event.entity && event.entity.product_id) {
      const product = await this.productService.getProductOrFail(
        event.entity.product_id,
      );

      event.entity.product_name = product.name;
      event.entity.product_price = product.price;
    }
  }
}
