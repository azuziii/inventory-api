import { Field, ObjectType } from '@nestjs/graphql';

export interface ErrorProps {
  code: string;
  message: string;
}

export interface ErrorPropsWithEntityName extends ErrorProps {
  entityName: string;
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
export abstract class BaseErrorWithEntityName
  extends BaseError
  implements ErrorPropsWithEntityName
{
  constructor(props: ErrorPropsWithEntityName) {
    super(props);
  }

  entityName!: string;
}
