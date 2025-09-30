import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field({ nullable: false })
  @IsNotEmpty()
  name!: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  code!: string;

  @Field(() => Float, { nullable: false })
  @IsNotEmpty()
  price!: number;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  isSample = false;

  @Field()
  @IsNotEmpty()
  customer_id!: string;
}

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  id!: string;
}
