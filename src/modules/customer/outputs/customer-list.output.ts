import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto, PaginationProps } from 'src/shared/dto/pagination.dto';
import { CustomerOutput } from './customer.output';

@ObjectType()
export class CustomerList {
  constructor(customers: CustomerOutput[], paginationProps: PaginationProps) {
    this.items = customers;
    this.pagination = new PaginationDto(paginationProps);
  }

  @Field(() => [CustomerOutput!]!)
  items!: CustomerOutput[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}
