import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteSuccess {
  @Field(() => Boolean)
  success = true;
}
