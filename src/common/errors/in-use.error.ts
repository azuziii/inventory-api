import { Field, ObjectType } from '@nestjs/graphql';
import { BaseError } from './error';

export interface InUseProps {
  resourceType: string;
  message?: string;
}

@ObjectType()
export class InUse extends BaseError {
  constructor(
    props: InUseProps & {
      entityType: string;
    },
  ) {
    super({
      code: 'IN_USE',
    });

    Object.assign(this, props);

    if (!this.message) {
      this.message = `${this.entityType} can't be deleted because it's used in other ${props.resourceType} records.`;
    }
  }

  @Field()
  entityType!: string;
}
