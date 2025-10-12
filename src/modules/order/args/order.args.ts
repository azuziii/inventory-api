import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { WithUuidArgMixin } from 'src/shared/args/get-by-id/get-by-id.mixin';
import { PaginationInput } from 'src/shared/dto/pagination.dto';
import { FindManyOptions } from 'typeorm';
import { Order } from '../entities/order.entity';

const OrderArgumentsBase = WithUuidArgMixin(PaginationInput, {
  required: false,
});

@ArgsType()
export class OrderArguments extends OrderArgumentsBase {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  order_number?: number;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  order_date?: Date;

  toManyOptions(): FindManyOptions<Order> {
    return {
      where: {
        ...(this.id ? { id: this.id } : null),
        ...(this.order_number ? { order_number: this.order_number } : null),
        ...(this.order_date ? { order_date: this.order_date } : null),
      },
      skip: (this.page - 1) * this.limit,
      take: this.limit,
    };
  }
}
