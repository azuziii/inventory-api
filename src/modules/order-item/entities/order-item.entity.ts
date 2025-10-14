import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/modules/order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { BaseUUIDEntity } from 'src/shared/base/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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
  product!: Product;

  @ManyToOne(() => Order, (order) => order.items)
  order!: Order;
}
