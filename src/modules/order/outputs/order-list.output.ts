import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto, PaginationProps } from 'src/shared/dto/pagination.dto';
import { OrderOutput } from './order.output';

@ObjectType()
export class OrderList {
  constructor(orders: OrderOutput[], paginationProps: PaginationProps) {
    this.items = orders;
    this.pagination = new PaginationDto(paginationProps);
  }

  @Field(() => [OrderOutput!]!)
  items!: OrderOutput[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}
