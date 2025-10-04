import { Field, ObjectType } from '@nestjs/graphql';
import { BaseErrorWithEntityType } from './error';

export interface AlreadyExistProps {
  field: string;
  message?: string;
}

@ObjectType()
export class AlreadyExist
  extends BaseErrorWithEntityType
  implements AlreadyExistProps
{
  static readonly __typename: string = 'AlreadyExist';

  constructor({
    entityType,
    ...props
  }: AlreadyExistProps & {
    entityType: string;
  }) {
    super({
      code: 'ALREADY_EXISTS',
      entityType,
      message: `${props.field} already exists`,
    });

    Object.assign(this, props);
  }

  @Field()
  field!: string;
}
