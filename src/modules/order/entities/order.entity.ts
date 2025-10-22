import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { BaseUUIDEntity } from 'src/shared/base/base.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('order')
@Index('UQ_ORDER_NUMBER_YEAR', ['order_year', 'order_number'], { unique: true })
@ObjectType()
export class Order extends BaseUUIDEntity {
  @Field(() => Int, { nullable: false })
  @Column({ type: 'text' })
  order_number!: number;

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
  })
  customer!: Customer;

  @Column({ type: 'uuid' })
  customer_id!: string;

  @BeforeInsert()
  setOrderYear() {
    this.order_year = new Date(this.order_date).getFullYear().toString();
  }
}
