import {
  ArgsType,
  Field,
  Float,
  ID,
  InputType,
  PartialType,
} from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { PaginationInput } from 'src/common/dto/pagination.dto';
import { UpdateCustomerDto } from 'src/modules/customer/dto/customer.dto';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { FindManyOptions, ILike } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './product.dto';

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
  @IsUUID()
  customer_id!: string;

  customer!: Customer;
}

@InputType()
export class UpdateProductInput
  extends PartialType(CreateProductInput)
  implements UpdateCustomerDto
{
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  @IsUUID()
  id!: string;
}

@ArgsType()
export class ProductArguments extends PaginationInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  code?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  price?: number;

  @Field({ nullable: true })
  @IsOptional()
  isSample?: boolean;

  toManyOptions(): FindManyOptions<Product> {
    return {
      where: {
        ...(this.id ? { id: this.id } : null),
        ...(this.name ? { name: ILike(`%${this.name}%`) } : null),
        ...(this.code ? { code: ILike(`%${this.code}%`) } : null),
        ...(this.price != null ? { price: this.price } : null),
        ...(this.isSample != null ? { isSample: this.isSample } : null),
      },
      skip: (this.page - 1) * this.limit,
      take: this.limit,
    };
  }
}
