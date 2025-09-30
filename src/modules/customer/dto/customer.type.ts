import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { NotFound } from 'src/common/errors/not-found.error';
import { AlreadyExist } from 'src/common/errors/alread-exist.error';
import { Customer } from '../entities/customer.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export const CustomerQueryResult = createUnionType({
  name: 'CustomerQueryResult',
  types: () => [Customer, NotFound],
});

export const CreateCustomerResult = createUnionType({
  name: 'CreateCustomerResult',
  types: () => [Customer, AlreadyExist],
});

export const UpdateCustomerResult = createUnionType({
  name: 'UpdateCustomerResult',
  types: () => [Customer, NotFound, AlreadyExist],
});

@ObjectType()
export class CustomerQueryResponse {
  @Field(() => CustomerQueryResult)
  customer: typeof CustomerQueryResult;
}

@ObjectType()
export class CustomersQueryResponse {
  @Field(() => [Customer!]!)
  customers: Customer[];

  @Field(() => PaginationDto)
  pagination: PaginationDto;
}

@ObjectType()
export class CreateCustomerResponse {
  @Field(() => CreateCustomerResult)
  customer: typeof CreateCustomerResult;
}

@ObjectType()
export class UpdateCustomerResponse {
  @Field(() => UpdateCustomerResult)
  customer: typeof UpdateCustomerResult;
}
