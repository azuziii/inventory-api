import { Field, ObjectType } from '@nestjs/graphql';
import { CreateCustomerUnion } from '../unions/create-customer.union';

@ObjectType()
export class CreateCustomerResponse {
  constructor(createResult: typeof CreateCustomerUnion) {
    this.customer = createResult;
  }

  @Field(() => CreateCustomerUnion)
  customer!: typeof CreateCustomerUnion;
}
