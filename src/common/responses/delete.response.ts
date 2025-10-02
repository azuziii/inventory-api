import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteResponse {
  @Field(() => ID)
  id: string;
}
