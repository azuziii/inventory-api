import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseError } from './error';

export interface AlreadyExistProps {
  field: string;
  message?: string;
}

@ObjectType()
export class AlreadyExist extends BaseError implements AlreadyExistProps {
  constructor({
    entityType,
    ...props
  }: AlreadyExistProps & {
    entityType: string;
  }) {
    super({
      code: 'ALREADY_EXISTS',
      entityType,
      message: `${props.field} already exists`,
    });

    Object.assign(this, props);
  }

  @Field()
  field!: string;
}
