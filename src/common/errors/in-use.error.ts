import { Field, ObjectType } from '@nestjs/graphql';
import { BaseError } from './error';

export interface InUseProps {
  resourceType: string;
  message?: string;
}

@ObjectType()
export class InUse extends BaseError implements InUseProps {
  static readonly __typename: string = 'InUse';

  constructor({
    entityType,
    ...props
  }: InUseProps & {
    entityType: string;
  }) {
    super({
      code: 'IN_USE',
      entityType,
      message: `${entityType} can't be deleted because it's used in other ${props.resourceType} records.`,
    });

    Object.assign(this, props);
  }

  resourceType!: string;
}
