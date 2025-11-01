import { Field, ObjectType } from '@nestjs/graphql';
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
@ObjectType()
export class Order extends BaseUUIDEntity {
  @Field({ nullable: false })
  @Column({ type: 'text' })
  order_number!: string;

  @Field(() => Date, { nullable: false })
  @Column({ type: 'timestamp' })
  order_date!: Date;

  @Field({ nullable: false })
  @Column({ type: 'text' })
  order_year!: string;

  @Field(() => Customer, { nullable: false })
  @ManyToOne(() => Customer, { lazy: true })
  @JoinColumn({
    name: 'customer_id',
    foreignKeyConstraintName: 'FK_CUSTOMER',
  })
  customer!: Customer;

  @Column({ type: 'uuid' })
  customer_id!: string;

  @Field(() => [OrderItem!], { nullable: false })
  @OneToMany(() => OrderItem, (item) => item.order, { lazy: true })
  items!: OrderItem[];

  @BeforeInsert()
  @BeforeUpdate()
  setOrderYear() {
    this.order_year = new Date(this.order_date).getFullYear().toString();
  }
}
