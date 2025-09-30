import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseError } from './error';

export interface NotFoundProps {
  id: string;
  message?: string;
}

@ObjectType()
export class NotFound extends BaseError {
  constructor(
    props: NotFoundProps & {
      entityType: string;
    },
  ) {
    super({
      code: 'NOT_FOUND',
    });

    Object.assign(this, props);

    if (!this.message) {
      this.message = `${this.entityType} not found.`;
    }
  }

  @Field(() => ID)
  id!: string;

  @Field()
  entityType!: string;
}
