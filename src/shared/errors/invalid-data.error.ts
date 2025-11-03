import { ObjectType } from '@nestjs/graphql';
import { BaseError } from './error';

export interface InvalidDataProps {
  i18nArgs?: Record<string, any>;
  message?: string;
}

export function InvalidData(entityName?: string) {
  const name = entityName ? `${entityName}InvalidData` : 'InvalidData';
  @ObjectType(name)
  class InvalidData extends BaseError implements InvalidDataProps {
    constructor(props: InvalidDataProps) {
      super({
        code: 'INVALID_DATA',
        i18nKey: 'common.errors.InvalidData',
        i18nArgs: {
          ...(props.i18nArgs || {}),
        },
      });

      Object.assign(this, props);
    }
  }

  return InvalidData;
}

export const InvalidDataException = InvalidData();
