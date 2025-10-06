import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseErrorWithEntityName } from './error';

export interface NotFoundProps {
  id: string;
  message?: string;
}

export function NotFound(entityName: string) {
  const name = `${entityName}NotFound`;
  @ObjectType(name)
  class NotFound extends BaseErrorWithEntityName implements NotFoundProps {
    constructor(props: NotFoundProps) {
      super({
        code: 'NOT_FOUND',
        entityName,
        message: `${entityName} not found.`,
      });

      Object.assign(this, props);
    }

    @Field(() => ID)
    id!: string;
  }

  return NotFound;
}
