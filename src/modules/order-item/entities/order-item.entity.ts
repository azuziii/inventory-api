import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/modules/order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { BaseUUIDEntity } from 'src/shared/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('order_item')
@ObjectType()
export class OrderItem extends BaseUUIDEntity {
  @Field()
  @Column({ type: 'text', nullable: false })
  product_name!: string;

  @Field(() => Float)
  @Column({ type: 'float', nullable: false })
  product_price!: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column({ type: 'int', nullable: false, default: 0 })
  quantity!: number;

  @Field(() => Product)
  @ManyToOne(() => Product, { lazy: true })
  @JoinColumn({
    name: 'product_id',
    foreignKeyConstraintName: 'FK_PRODUCT_ORDER_ITEM',
  })
  product!: Product;

  @Column({ type: 'uuid' })
  product_id!: string;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({
    name: 'order_id',
    foreignKeyConstraintName: 'FK_ORDER',
  })
  order!: Order;

  @Column({ type: 'uuid' })
  order_id!: string;
}
