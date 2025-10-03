import { ObjectType } from '@nestjs/graphql';
import {
  AlreadyExist,
  AlreadyExistProps,
} from 'src/common/errors/already-exist.error';
import { InUse, InUseProps } from 'src/common/errors/in-use.error';
import { NotFound, NotFoundProps } from 'src/common/errors/not-found.error';

const ENTITY_TYPE = 'Customer';

@ObjectType()
export class CustomerAlreadyExist extends AlreadyExist {
  static readonly __typename = 'CustomerAlreadyExist';

  constructor(props: AlreadyExistProps) {
    super({
      entityType: ENTITY_TYPE,
      ...props,
    });
  }
}

@ObjectType()
export class CustomerNotFound extends NotFound {
  static readonly __typename = 'CustomerNotFound';

  constructor(props: NotFoundProps) {
    super({
      entityType: ENTITY_TYPE,
      ...props,
    });
  }
}

@ObjectType()
export class CustomerInUse extends InUse {
  static readonly __typename = 'CustomerInUse';

  constructor(props: InUseProps) {
    super({
      entityType: ENTITY_TYPE,
      ...props,
    });
  }
}
