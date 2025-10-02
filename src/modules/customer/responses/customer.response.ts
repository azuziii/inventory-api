import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from '../entities/customer.entity';
import { PaginationDto, PaginationProps } from 'src/common/dto/pagination.dto';
import { CreateCustomerResult } from '../results/create-customer.result';
import { DeleteCustomerResult } from '../results/delete-customer.result';
import { CustomerQueryResult } from '../results/query-customer.result';
import { UpdateCustomerResult } from '../results/update-customer.result';

@ObjectType()
export class CustomerQueryResponse {
  constructor(queryResult: typeof CustomerQueryResult) {
    this.customer = queryResult;
  }

  @Field(() => CustomerQueryResult)
  customer!: typeof CustomerQueryResult;
}

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

@ObjectType()
export class CreateCustomerResponse {
  constructor(createResult: typeof CreateCustomerResult) {
    this.customer = createResult;
  }

  @Field(() => CreateCustomerResult)
  customer!: typeof CreateCustomerResult;
}

@ObjectType()
export class UpdateCustomerResponse {
  constructor(updateResult: typeof UpdateCustomerResult) {
    this.customer = updateResult;
  }

  @Field(() => UpdateCustomerResult)
  customer!: typeof UpdateCustomerResult;
}

@ObjectType()
export class DeleteCustomerResponse {
  constructor(deleteResult: typeof DeleteCustomerResult) {
    this.customer = deleteResult;
  }

  @Field(() => DeleteCustomerResult)
  customer!: typeof DeleteCustomerResult;
}
