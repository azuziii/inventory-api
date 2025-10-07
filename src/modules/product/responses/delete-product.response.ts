import { Field, ObjectType } from '@nestjs/graphql';
import { DeleteProductUnion } from '../unions/delete-product.union';

@ObjectType()
export class DeleteProductResponse {
  constructor(deleteResult: typeof DeleteProductUnion) {
    this.product = deleteResult;
  }

  @Field(() => DeleteProductUnion)
  product!: typeof DeleteProductUnion;
}
