import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { WithUuidArgMixin } from 'src/shared/args/get-by-id/get-by-id.mixin';
import { PaginationInput } from 'src/shared/dto/pagination.dto';
import { FindManyOptions, ILike } from 'typeorm';
import { Customer } from '../entities/customer.entity';

const CustomerArgumentsBase = WithUuidArgMixin(PaginationInput, {
  required: false,
});

@ArgsType()
export class CustomerArguments extends CustomerArgumentsBase {
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
