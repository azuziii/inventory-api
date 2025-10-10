import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { WithUuidInputMixin } from 'src/shared/inputs/get-by-id/get-by-id.mixin';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer.dto';

@InputType()
export class CreateCustomerInput implements CreateCustomerDto {
  @Field({ nullable: false })
  @IsNotEmpty()
  name!: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  address!: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  city!: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  country!: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  ice!: string;

  @Field({ nullable: true })
  @IsOptional()
  contact_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  contact_phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  contact_email?: string;
}

const UpdateCustomerInputBase = WithUuidInputMixin(
  PartialType(CreateCustomerInput),
);

@InputType()
export class UpdateCustomerInput
  extends UpdateCustomerInputBase
  implements UpdateCustomerDto {}
