import { Field, ObjectType } from '@nestjs/graphql';
import { BaseErrorWithEntityName } from './error';

export interface AlreadyExistProps {
  field: string;
  message?: string;
}

export function AlreadyExist(entityName: string) {
  const name = `${entityName}AlreadyExist`;

  @ObjectType(name)
  class AlreadyExist
    extends BaseErrorWithEntityName
    implements AlreadyExistProps
  {
    constructor(props: AlreadyExistProps) {
      super({
        code: 'ALREADY_EXISTS',
        entityName,
        message: `${props.field} already exists`,
      });

      Object.assign(this, props);
    }

    @Field()
    field!: string;
  }

  return AlreadyExist;
}
