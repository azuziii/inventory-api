import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';
import { CustomerOutput } from 'src/modules/customer/outputs/customer.output';
import { BaseOutput } from 'src/shared/base/output';

@ObjectType('Product')
export class ProductOutput extends BaseOutput {
  @Field(() => ID)
  @Expose()
  id!: string;

  @Field({ nullable: false })
  @Expose()
  name!: string;

  @Field({ nullable: false })
  @Expose()
  code!: string;

  @Field(() => Float, { nullable: false, defaultValue: 0 })
  @Expose()
  price!: number;

  @Field({ nullable: false, defaultValue: false })
  @Expose()
  isSample!: boolean;

  @Field(() => CustomerOutput, { nullable: false })
  @Expose()
  @Type(() => CustomerOutput)
  customer!: CustomerOutput;
}
