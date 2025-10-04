import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseErrorWithEntityType } from './error';

export interface NotFoundProps {
  id: string;
  message?: string;
}

@ObjectType()
export class NotFound extends BaseErrorWithEntityType implements NotFoundProps {
  static readonly __typename: string = 'NotFound';

  constructor({
    entityType,
    ...props
  }: NotFoundProps & {
    entityType: string;
  }) {
    super({
      code: 'NOT_FOUND',
      entityType,
      message: `${entityType} not found.`,
    });

    Object.assign(this, props);
  }

  @Field(() => ID)
  id!: string;
}
