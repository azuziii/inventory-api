import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { CreateOrderItemForOrderInput } from 'src/modules/order-item/inputs/order-item.input';
import { WithUuidInputMixin } from 'src/shared/inputs/get-by-id/get-by-id.mixin';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';

@InputType()
export class CreateOrderInput implements CreateOrderDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  order_number!: string;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  order_date!: Date;

  @Field()
  @IsNotEmpty()
  @IsUUID('all', {
    message: i18nValidationMessage('validation.invalid_uuid'),
  })
  customer_id!: string;

  @Field(() => [CreateOrderItemForOrderInput], { nullable: false })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateOrderItemForOrderInput)
  @ValidateNested({ each: true })
  items!: CreateOrderItemForOrderInput[];
}

const UpdateOrderInputBase = WithUuidInputMixin(
  PartialType(OmitType(CreateOrderInput, ['items'])),
);

@InputType()
export class UpdateOrderInput
  extends UpdateOrderInputBase
  implements UpdateOrderDto {}
