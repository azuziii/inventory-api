import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
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
  @IsUUID('all', {
    message: i18nValidationMessage('validation.invalid_uuid'),
  })
  customer_id!: string;

  @Field(() => [CreateOrderItemInput], { nullable: false })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateOrderItemInput)
  @ValidateNested({ each: true })
  items!: CreateOrderItemInput[];
}

const UpdateOrderInputBase = WithUuidInputMixin(PartialType(CreateOrderInput));

@InputType()
export class UpdateOrderInput
  extends UpdateOrderInputBase
  implements UpdateOrderDto {}
