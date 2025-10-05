import { ObjectType } from '@nestjs/graphql';
import { BaseError } from './error';

export interface InvalidDataProps {
  message?: string;
}

@ObjectType()
export class InvalidData extends BaseError implements InvalidDataProps {
  static readonly __typename: string = 'InvalidData';

  constructor(props?: InvalidDataProps) {
    super({
      code: 'INVALID_DATA',
      message: `Invlaid data`,
    });

    Object.assign(this, props);
  }
}
