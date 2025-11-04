import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/modules/product/entities/product.entity';
import { IProduct } from 'src/modules/product/interfaces/product.interface';
import { ProductForbiddenRelation } from 'src/shared/domain-errors';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
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
    await this.checkProductCustomerRelation(event);
  }

  async beforeUpdate(event: UpdateEvent<any>): Promise<void> {
    await this.setProductProps(event);
    await this.checkProductCustomerRelation(event);
    this.checkQuantity(event);
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

  async checkProductCustomerRelation(
    event: InsertEvent<OrderItem> | UpdateEvent<OrderItem>,
  ) {
    if (!event.entity) return;

    let order_id = event.entity.order_id;
    let product_id = event.entity.product_id;

    const isMatch = await event.manager
      .getRepository(Product)
      .createQueryBuilder('product')
      .innerJoin('product.customer', 'p_customer')
      .innerJoin('order', 'o', 'o.customer_id = p_customer.id')
      .where('product.id = :product_id', { product_id })
      .andWhere('o.id = :order_id', { order_id })
      .getExists();

    if (!isMatch) {
      throw new ProductForbiddenRelation({
        resourceName: 'customer',
      });
    }
  }

  checkQuantity(event: UpdateEvent<OrderItem>) {
    if (!event.entity) return;

    const { quantity, total_shipped } = event.entity as OrderItem;

    if (!(quantity < total_shipped)) return;

    // TODO: Temporarely use InvalidDataException
    throw new InvalidDataException({
      i18nKey: 'en.order-item.errors.quantityBelowShipped',
      i18nArgs: {
        quantity,
        total_shipped,
      },
    });
  }
}
