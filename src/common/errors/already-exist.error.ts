import { Field, ObjectType } from '@nestjs/graphql';
import { BaseErrorWithEntityType } from './error';

export interface AlreadyExistProps {
  field: string;
  message?: string;
}

export function AlreadyExist(entityType: string) {
  const name = `${entityType}AlreadyExist`;

  @ObjectType(name)
  class AlreadyExist
    extends BaseErrorWithEntityType
    implements AlreadyExistProps
  {
    constructor(props: AlreadyExistProps) {
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

  return AlreadyExist;
}
