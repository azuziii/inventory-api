import { Field, ObjectType } from '@nestjs/graphql';
import { CustomerQueryUnion } from '../unions/query-customer.union';

@ObjectType()
export class CustomerQueryResponse {
  constructor(queryResult: typeof CustomerQueryUnion) {
    this.customer = queryResult;
  }

  @Field(() => CustomerQueryUnion)
  customer!: typeof CustomerQueryUnion;
}
