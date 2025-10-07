import { Field, ObjectType } from '@nestjs/graphql';
import { UpdateProductUnion } from '../unions/update-product.union';

@ObjectType()
export class UpdateProductResponse {
  constructor(updateResult: typeof UpdateProductUnion) {
    this.product = updateResult;
  }

  @Field(() => UpdateProductUnion)
  product!: typeof UpdateProductUnion;
}
