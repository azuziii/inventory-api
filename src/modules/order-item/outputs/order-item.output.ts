import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';
import { ProductOutput } from 'src/modules/product/outputs/product.output';
import { BaseOutput } from 'src/shared/base/output';

@ObjectType('OrderItem')
export class OrderItemOutput extends BaseOutput {
  @Field(() => ID)
  @Expose()
  id!: string;

  @Field()
  @Expose()
  product_name!: string;

  @Field(() => Float)
  @Expose()
  product_price!: number;

  @Field(() => Int, { defaultValue: 0 })
  @Expose()
  quantity!: number;

  @Field(() => Int, { defaultValue: 0 })
  @Expose()
  total_shipped!: number;

  @Field(() => ProductOutput)
  @Type(() => ProductOutput)
  @Expose()
  product!: ProductOutput;
}
