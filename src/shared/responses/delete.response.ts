import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../base/output';

@ObjectType()
export class DeleteResponse extends BaseOutput {
  constructor(id: string) {
    super();
    this.id = id;
  }

  @Field(() => ID)
  id!: string;
}
