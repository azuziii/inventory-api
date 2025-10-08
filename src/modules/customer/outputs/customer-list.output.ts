import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto, PaginationProps } from 'src/common/dto/pagination.dto';
import { Customer } from '../entities/customer.entity';

@ObjectType()
export class CustomerList {
  constructor(customers: Customer[], paginationProps: PaginationProps) {
    this.items = customers;
    this.pagination = new PaginationDto(paginationProps);
  }

  @Field(() => [Customer!]!)
  items!: Customer[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}
