import { Field, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from 'src/shared/base/output';
import { PaginationDto, PaginationProps } from 'src/shared/dto/pagination.dto';
import { CustomerOutput } from './customer.output';

@ObjectType()
export class CustomerList extends BaseOutput {
  constructor(customers: CustomerOutput[], paginationProps: PaginationProps) {
    super();
    this.items = customers;
    this.pagination = new PaginationDto(paginationProps);
  }

  @Field(() => [CustomerOutput!]!)
  items!: CustomerOutput[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}
