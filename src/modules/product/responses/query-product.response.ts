import { Field, ObjectType } from '@nestjs/graphql';
import { ProductQueryUnion } from '../unions/query-product.union';

@ObjectType()
export class ProductQueryResponse {
  constructor(queryResult: typeof ProductQueryUnion) {
    this.product = queryResult;
  }

  @Field(() => ProductQueryUnion)
  product!: typeof ProductQueryUnion;
}
