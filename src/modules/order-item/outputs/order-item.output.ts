import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ProductOutput } from 'src/modules/product/outputs/product.output';

@ObjectType('orderItem')
export class OrderItemOutput {
  @Field()
  product_name!: string;

  @Field(() => Float)
  product_price!: number;

  @Field(() => Int, { defaultValue: 0 })
  quantity!: number;

  @Field(() => Int, { defaultValue: 0 })
  total_shipped!: number;

  @Field(() => ProductOutput)
  product!: ProductOutput;
}
