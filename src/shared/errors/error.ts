import { Field, ObjectType } from '@nestjs/graphql';
import { LocalizedError, LocalizedErrorProps } from './localized.error';

export interface ErrorProps extends LocalizedErrorProps {
  code: string;
}

export interface ErrorPropsWithEntityName extends ErrorProps {
  entityName: string;
}

@ObjectType({ isAbstract: true })
export abstract class BaseError extends LocalizedError {
  constructor(props: ErrorProps) {
    super();
    Object.assign(this, props);
    this.lowerCaseArgs();
    this.message = props.i18nKey;
  }

  readonly __typename!: string;
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
