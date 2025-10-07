import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto, PaginationProps } from 'src/common/dto/pagination.dto';
import { Customer } from '../entities/customer.entity';

@ObjectType()
export class CustomersQueryResponse {
  constructor(customers: Customer[], paginationProps: PaginationProps) {
    this.customers = customers;
    this.pagination = new PaginationDto(paginationProps);
  }

  @Field(() => [Customer!]!)
  customers!: Customer[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}
