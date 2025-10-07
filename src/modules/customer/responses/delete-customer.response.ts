import { Field, ObjectType } from '@nestjs/graphql';
import { DeleteCustomerUnion } from '../unions/delete-customer.union';

@ObjectType()
export class DeleteCustomerResponse {
  constructor(deleteResult: typeof DeleteCustomerUnion) {
    this.customer = deleteResult;
  }

  @Field(() => DeleteCustomerUnion)
  customer!: typeof DeleteCustomerUnion;
}
