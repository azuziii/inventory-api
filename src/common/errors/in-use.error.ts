import { ObjectType } from '@nestjs/graphql';
import { BaseErrorWithEntityName } from './error';

export interface InUseProps {
  resourceType: string;
  message?: string;
}

export function InUse(entityName: string) {
  const name = `${entityName}InUse`;

  @ObjectType(name)
  class InUse extends BaseErrorWithEntityName implements InUseProps {
    constructor(props: InUseProps) {
      super({
        code: 'IN_USE',
        entityName,
        message: `${entityName} can't be deleted because it's used in other ${props.resourceType} records.`,
      });

      Object.assign(this, props);
    }

    resourceType!: string;
  }

  return InUse;
}
