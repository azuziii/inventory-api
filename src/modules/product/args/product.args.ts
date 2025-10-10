import { ArgsType, Field, Float } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { WithUuidArgMixin } from 'src/shared/args/get-by-id/get-by-id.mixin';
import { PaginationInput } from 'src/shared/dto/pagination.dto';
import { FindManyOptions, ILike } from 'typeorm';
import { Product } from '../entities/product.entity';

const ProductArgumentsBase = WithUuidArgMixin(PaginationInput, {
  required: false,
});

@ArgsType()
export class ProductArguments extends ProductArgumentsBase {
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
