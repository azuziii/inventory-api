import { ArgsType, Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { PaginationInput } from 'src/common/dto/pagination.dto';
import { FindManyOptions, ILike } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';

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

@ArgsType()
export class CustomerArguments extends PaginationInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  address?: string;

  @Field({ nullable: true })
  @IsOptional()
  city?: string;

  @Field({ nullable: true })
  @IsOptional()
  ice?: string;

  @Field({ nullable: true })
  @IsOptional()
  country?: string;

  @Field({ nullable: true })
  @IsOptional()
  contact_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  contact_phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  contact_email?: string;

  toManyOptions(): FindManyOptions<Customer> {
    return {
      where: {
        ...(this.id ? { id: this.id } : null),
        ...(this.name ? { name: ILike(`%${this.name}%`) } : null),
        ...(this.address ? { address: ILike(`%${this.address}%`) } : null),
        ...(this.city ? { city: ILike(`%${this.city}%`) } : null),
        ...(this.contact_email
          ? { contact_email: ILike(`%${this.contact_email}%`) }
          : null),
        ...(this.contact_name
          ? { contact_name: ILike(`%${this.contact_name}%`) }
          : null),
        ...(this.contact_phone
          ? { contact_phone: ILike(`%${this.contact_phone}%`) }
          : null),
        ...(this.ice ? { ice: ILike(`%${this.ice}%`) } : null),
      },
      skip: (this.page - 1) * this.limit,
      take: this.limit,
    };
  }
}
