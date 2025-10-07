import { Field, ObjectType } from '@nestjs/graphql';
import { CreateProductUnion } from '../unions/create-product.union';

@ObjectType()
export class CreateProductResponse {
  constructor(createResult: typeof CreateProductUnion) {
    this.product = createResult;
  }

  @Field(() => CreateProductUnion)
  product!: typeof CreateProductUnion;
}
