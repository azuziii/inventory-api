import { Field, ObjectType } from '@nestjs/graphql';
import { UpdateCustomerUnion } from '../unions/update-customer.union';

@ObjectType()
export class UpdateCustomerResponse {
  constructor(updateResult: typeof UpdateCustomerUnion) {
    this.customer = updateResult;
  }

  @Field(() => UpdateCustomerUnion)
  customer!: typeof UpdateCustomerUnion;
}
