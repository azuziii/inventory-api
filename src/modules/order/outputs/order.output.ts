import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';
import { CustomerOutput } from 'src/modules/customer/outputs/customer.output';
import { OrderItemOutput } from 'src/modules/order-item/outputs/order-item.output';
import { BaseOutput } from 'src/shared/base/output';

@ObjectType('Order')
export class OrderOutput extends BaseOutput {
  @Field(() => ID)
  @Expose()
  id!: string;

  @Field({ nullable: false })
  @Expose()
  order_number!: string;

  @Field(() => Date, { nullable: false })
  @Expose()
  order_date!: Date;

  @Field({ nullable: false })
  @Expose()
  order_year!: string;

  @Field(() => CustomerOutput, { nullable: false })
  @Type(() => CustomerOutput)
  @Expose()
  customer!: CustomerOutput;

  @Field(() => [OrderItemOutput!], { nullable: false })
  @Type(() => OrderItemOutput)
  @Expose()
  items!: OrderItemOutput[];
}
