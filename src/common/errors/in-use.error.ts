import { ObjectType } from '@nestjs/graphql';
import { BaseErrorWithEntityType } from './error';

export interface InUseProps {
  resourceType: string;
  message?: string;
}

export function InUse(entityType: string) {
  const name = `${entityType}InUse`;

  @ObjectType(name)
  class InUse extends BaseErrorWithEntityType implements InUseProps {
    constructor(props: InUseProps) {
      super({
        code: 'IN_USE',
        entityType,
        message: `${entityType} can't be deleted because it's used in other ${props.resourceType} records.`,
      });

      Object.assign(this, props);
    }

    resourceType!: string;
  }

  return InUse;
}
