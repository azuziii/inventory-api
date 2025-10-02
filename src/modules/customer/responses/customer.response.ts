import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateCustomerResult,
  CustomerQueryResult,
  DeleteCustomerResult,
  UpdateCustomerResult,
} from '../results/customer.result';
import { Customer } from '../entities/customer.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ObjectType()
export class CustomerQueryResponse {
  @Field(() => CustomerQueryResult)
  customer!: typeof CustomerQueryResult;
}

@ObjectType()
export class CustomersQueryResponse {
  @Field(() => [Customer!]!)
  customers!: Customer[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}

@ObjectType()
export class CreateCustomerResponse {
  @Field(() => CreateCustomerResult)
  customer!: typeof CreateCustomerResult;
}

@ObjectType()
export class UpdateCustomerResponse {
  @Field(() => UpdateCustomerResult)
  customer!: typeof UpdateCustomerResult;
}

@ObjectType()
export class DeleteCustomerResponse {
  @Field(() => DeleteCustomerResult)
  customer!: typeof DeleteCustomerResult;
}
