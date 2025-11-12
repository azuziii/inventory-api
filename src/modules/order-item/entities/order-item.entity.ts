import { Order } from 'src/modules/order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { BaseUUIDEntity } from 'src/shared/base/base.entity';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('order_item')
export class OrderItem extends BaseUUIDEntity {
  @Column({ type: 'text', nullable: false })
  product_name!: string;

  @Column({ type: 'float', nullable: false })
  product_price!: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  quantity!: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  total_shipped!: number;

  @ManyToOne(() => Product, { lazy: true })
  @JoinColumn({
    name: 'product_id',
    foreignKeyConstraintName: 'FK_PRODUCT_ORDER_ITEM',
  })
  product!: Promise<Product>;

  @Column({ type: 'uuid' })
  product_id!: string;

  @ManyToOne(() => Order, (order) => order.items, { lazy: true })
  @JoinColumn({
    name: 'order_id',
    foreignKeyConstraintName: 'FK_ORDER',
  })
  order!: Promise<Order>;

  @Column({ type: 'uuid' })
  order_id!: string;

  updateTotalShipped(quantity: number) {
    const newTotalShippedQuantity = this.total_shipped + quantity;

    if (newTotalShippedQuantity > this.quantity) {
      // TODO: Temporarely use InvalidDataException
      throw new InvalidDataException({
        i18nKey: 'en.order-item.errors.quantityExceeded',
        i18nArgs: {
          currentQuantity: newTotalShippedQuantity,
          orderQuantity: this.quantity,
        },
      });
    }

    this.total_shipped = newTotalShippedQuantity;
  }
}
