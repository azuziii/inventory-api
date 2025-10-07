import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto, PaginationProps } from 'src/common/dto/pagination.dto';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerUnion } from '../unions/create-customer.union';
import { DeleteCustomerUnion } from '../unions/delete-customer.union';
import { CustomerQueryUnion } from '../unions/query-customer.union';
import { UpdateCustomerUnion } from '../unions/update-customer.union';

@ObjectType()
export class CustomerQueryResponse {
  constructor(queryResult: typeof CustomerQueryUnion) {
    this.customer = queryResult;
  }

  @Field(() => CustomerQueryUnion)
  customer!: typeof CustomerQueryUnion;
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
  constructor(createResult: typeof CreateCustomerUnion) {
    this.customer = createResult;
  }

  @Field(() => CreateCustomerUnion)
  customer!: typeof CreateCustomerUnion;
}

@ObjectType()
export class UpdateCustomerResponse {
  constructor(updateResult: typeof UpdateCustomerUnion) {
    this.customer = updateResult;
  }

  @Field(() => UpdateCustomerUnion)
  customer!: typeof UpdateCustomerUnion;
}

@ObjectType()
export class DeleteCustomerResponse {
  constructor(deleteResult: typeof DeleteCustomerUnion) {
    this.customer = deleteResult;
  }

  @Field(() => DeleteCustomerUnion)
  customer!: typeof DeleteCustomerUnion;
}
