import { Field, ObjectType } from '@nestjs/graphql';

interface ErrorProps {
  code: string;
  message?: string;
}

@ObjectType({ isAbstract: true })
export abstract class BaseError implements ErrorProps {
  constructor(props: ErrorProps) {
    Object.assign(this, props);
  }

  readonly __isError = true;

  @Field()
  code!: string;

  @Field()
  message!: string;
}
