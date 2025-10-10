import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { UpdateCustomerDto } from 'src/modules/customer/dto/customer.dto';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { WithUuidInputMixin } from 'src/shared/inputs/get-by-id/get-by-id.mixin';
import { CreateProductDto } from '../dto/product.dto';

@InputType()
export class CreateProductInput implements CreateProductDto {
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
  isSample: boolean = false;

  @Field()
  @IsNotEmpty()
  @IsUUID('all', {
    message: i18nValidationMessage('validation.invalid_uuid'),
  })
  customer_id!: string;

  customer!: Customer;
}

const UpdateProductInputBase = WithUuidInputMixin(
  PartialType(CreateProductInput),
);

@InputType()
export class UpdateProductInput
  extends UpdateProductInputBase
  implements UpdateCustomerDto {}
