import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseErrorWithEntityType } from './error';

export interface NotFoundProps {
  id: string;
  message?: string;
}

export function NotFound(entityType: string) {
  const name = `${entityType}NotFound`;
  @ObjectType(name)
  class NotFound extends BaseErrorWithEntityType implements NotFoundProps {
    constructor(props: NotFoundProps) {
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

  return NotFound;
}
