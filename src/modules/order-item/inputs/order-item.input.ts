import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';
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
}

const UpdateOrderItemInputBase = WithUuidInputMixin(
  PartialType(CreateOrderItemInput),
);

@InputType()
export class UpdateOrderItemInput
  extends UpdateOrderItemInputBase
  implements UpdateOrderItemDto {}
