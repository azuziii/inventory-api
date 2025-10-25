import {
  Field,
  ID,
  InputType,
  Int,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { WithUuidInputMixin } from 'src/shared/inputs/get-by-id/get-by-id.mixin';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dto/order-item.dto';

@InputType()
export class CreateOrderItemInput implements CreateOrderItemDto {
  @Field(() => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity!: number;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  product_id!: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  order_id!: string;
}

@InputType()
export class CreateOrderItemForOrderInput extends OmitType(
  CreateOrderItemInput,
  ['order_id'],
) {}

const UpdateOrderItemInputBase = WithUuidInputMixin(
  PartialType(CreateOrderItemInput),
);

@InputType()
export class UpdateOrderItemInput
  extends UpdateOrderItemInputBase
  implements UpdateOrderItemDto {}
