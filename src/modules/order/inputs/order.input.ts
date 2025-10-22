import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
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
}

const UpdateOrderInputBase = WithUuidInputMixin(PartialType(CreateOrderInput));

@InputType()
export class UpdateOrderInput
  extends UpdateOrderInputBase
  implements UpdateOrderDto {}
