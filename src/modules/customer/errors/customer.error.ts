import { ObjectType } from '@nestjs/graphql';
import {
  AlreadyExist,
  AlreadyExistProps,
} from 'src/common/errors/already-exist.error';
import { InUse, InUseProps } from 'src/common/errors/in-use.error';
import { NotFound, NotFoundProps } from 'src/common/errors/not-found.error';

@ObjectType()
export class CustomerAlreadyExist extends AlreadyExist {
  static readonly __typename = 'CUSTOMER_ALREADY_EXISTS';

  constructor(props: AlreadyExistProps) {
    super({
      entityType: 'Customer',
      ...props,
    });
  }
}

@ObjectType()
export class CustomerNotFound extends NotFound {
  static readonly __typename = 'CUSTOMER_NOT_FOUND';

  constructor(props: NotFoundProps) {
    super({
      entityType: 'Customer',
      ...props,
    });
  }
}

@ObjectType()
export class CustomerInUse extends InUse {
  static readonly __typename = 'CUSTOMER_IN_USE';

  constructor(props: InUseProps) {
    super({
      entityType: 'Customer',
      ...props,
    });
  }
}
