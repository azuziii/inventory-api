import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto, PaginationProps } from 'src/shared/dto/pagination.dto';
import { Order } from '../entities/order.entity';

@ObjectType()
export class OrderList {
  constructor(orders: Order[], paginationProps: PaginationProps) {
    this.items = orders;
    this.pagination = new PaginationDto(paginationProps);
  }

  @Field(() => [Order!]!)
  items!: Order[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}
