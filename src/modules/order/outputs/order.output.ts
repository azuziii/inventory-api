import { Field, ObjectType } from '@nestjs/graphql';
import { CustomerOutput } from 'src/modules/customer/outputs/customer.output';
import { OrderItemOutput } from 'src/modules/order-item/outputs/order-item.output';

@ObjectType('Order')
export class OrderOutput {
  @Field({ nullable: false })
  order_number!: string;

  @Field(() => Date, { nullable: false })
  order_date!: Date;

  @Field({ nullable: false })
  order_year!: string;

  @Field(() => CustomerOutput, { nullable: false })
  customer!: CustomerOutput;

  @Field(() => [OrderItemOutput!], { nullable: false })
  items!: OrderItemOutput[];
}
