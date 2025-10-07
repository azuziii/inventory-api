import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
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

@InputType()
export class UpdateCustomerInput
  extends PartialType(CreateCustomerInput)
  implements UpdateCustomerDto
{
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  @IsUUID()
  id!: string;
}
