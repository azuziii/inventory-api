import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { CreateOrderItemInput } from 'src/modules/order-item/inputs/order-item.input';
import { WithUuidInputMixin } from 'src/shared/inputs/get-by-id/get-by-id.mixin';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';

@InputType()
export class CreateOrderInput implements CreateOrderDto {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  order_number!: number;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  order_date!: Date;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  customer_id!: string;

  @Field(() => [CreateOrderItemInput], { nullable: false })
  @IsArray()
  @MinLength(1)
  @Type(() => CreateOrderItemInput)
  @ValidateNested({ each: true })
  items!: CreateOrderItemInput[];

  customer!: Customer;
}

const UpdateOrderInputBase = WithUuidInputMixin(PartialType(CreateOrderInput));

@InputType()
export class UpdateOrderInput
  extends UpdateOrderInputBase
  implements UpdateOrderDto {}
