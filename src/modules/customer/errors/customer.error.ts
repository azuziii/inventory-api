import { ObjectType } from '@nestjs/graphql';
import {
  AlreadyExist,
  AlreadyExistProps,
} from 'src/common/errors/already-exist.error';
import { InUse, InUseProps } from 'src/common/errors/in-use.error';
import { NotFound, NotFoundProps } from 'src/common/errors/not-found.error';

@ObjectType()
export class CustomerAlreadyExist extends AlreadyExist {
  constructor(props: AlreadyExistProps) {
    super({
      entityType: 'Customer',
      ...props,
    });
  }
}

@ObjectType()
export class CustomerNotFound extends NotFound {
  constructor(props: NotFoundProps) {
    super({
      entityType: 'Customer',
      ...props,
    });
  }
}

@ObjectType()
export class CustomerInUse extends InUse {
  constructor(props: InUseProps) {
    super({
      entityType: 'Customer',
      ...props,
    });
  }
}
