import { Field, ObjectType } from '@nestjs/graphql';

export interface ErrorProps {
  code: string;
  message: string;
  entityType?: string;
}

@ObjectType({ isAbstract: true })
export abstract class BaseError {
  constructor(props: ErrorProps) {
    Object.assign(this, props);
  }

  readonly __isError = true;

  @Field()
  code!: string;

  @Field()
  message!: string;
}

@ObjectType({ isAbstract: true })
export abstract class BaseErrorWithEntityType
  extends BaseError
  implements ErrorProps
{
  constructor(props: ErrorProps) {
    super(props);
  }

  entityType!: string;
}
