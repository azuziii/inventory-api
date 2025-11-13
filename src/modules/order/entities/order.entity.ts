import { Customer } from 'src/modules/customer/entities/customer.entity';
import { OrderItem } from 'src/modules/order-item/entities/order-item.entity';
import { BaseUUIDEntity } from 'src/shared/base/base.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('order')
@Index('UQ_ORDER_NUMBER_YEAR', ['order_year', 'order_number'], { unique: true })
export class Order extends BaseUUIDEntity {
  @Column({ type: 'text' })
  order_number!: string;

  @Column({ type: 'timestamp' })
  order_date!: Date;

  @Column({ type: 'text' })
  order_year!: string;

  @ManyToOne(() => Customer, { lazy: true })
  @JoinColumn({
    name: 'customer_id',
    foreignKeyConstraintName: 'FK_CUSTOMER',
  })
  customer!: Promise<Customer>;

  @Column({ type: 'uuid' })
  customer_id!: string;

  @OneToMany(() => OrderItem, (item) => item.order, { lazy: true })
  items!: Promise<OrderItem[]>;

  @BeforeInsert()
  @BeforeUpdate()
  setOrderYear() {
    this.order_year = new Date(this.order_date).getFullYear().toString();
  }
}
