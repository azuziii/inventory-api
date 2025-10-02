import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteResponse {
  constructor(id: string) {
    this.id = id;
  }

  @Field(() => ID)
  id!: string;
}
