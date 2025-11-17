import { Field, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from 'src/shared/base/output';
import { PaginationDto, PaginationProps } from 'src/shared/dto/pagination.dto';
import { OrderOutput } from './order.output';

@ObjectType()
export class OrderList extends BaseOutput {
  constructor(orders: OrderOutput[], paginationProps: PaginationProps) {
    super();
    this.items = orders;
    this.pagination = new PaginationDto(paginationProps);
  }

  @Field(() => [OrderOutput!]!)
  items!: OrderOutput[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}
