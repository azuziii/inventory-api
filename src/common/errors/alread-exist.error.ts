import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseError } from './error';

export interface AlreadyExistProps {
  field: string;
  message?: string;
}

@ObjectType()
export class AlreadyExist extends BaseError {
  constructor(
    props: AlreadyExistProps & {
      entityType: string;
    },
  ) {
    super({
      code: 'ALREADY_EXISTS',
    });

    Object.assign(this, props);

    if (!this.message) {
      this.message = `${this.field} already exists`;
    }
  }

  @Field()
  field!: string;

  @Field()
  entityType!: string;
}
