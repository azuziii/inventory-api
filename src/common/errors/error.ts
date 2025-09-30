import { Field, ObjectType } from '@nestjs/graphql';

interface ErrorProps {
  code: string;
  message?: string;
}

@ObjectType({ isAbstract: true })
export class BaseError {
  constructor(props: ErrorProps) {
    Object.assign(this, props);
  }

  @Field()
  code!: string;

  @Field()
  message!: string;
}
