import { ObjectType } from '@nestjs/graphql';
import { BaseErrorWithEntityName } from './error';

export interface InUseProps {
  resourceName: string;
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
        i18nKey: 'common.errors.InUse',
        i18nArgs: {
          entityName: entityName,
          resourceName: props.resourceName,
        },
      });

      Object.assign(this, props);
    }

    resourceName!: string;
  }

  return InUse;
}
