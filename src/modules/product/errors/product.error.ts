import {
  AlreadyExist,
  AlreadyExistProps,
} from 'src/common/errors/already-exist.error';
import { NotFound, NotFoundProps } from 'src/common/errors/not-found.error';

export class ProductAlreadyExist extends AlreadyExist {
  constructor(props: AlreadyExistProps) {
    super({
      entityType: 'Product',
      ...props,
    });
  }
}

export class ProductNotFound extends NotFound {
  constructor(props: NotFoundProps) {
    super({
      entityType: 'Product',
      ...props,
    });
  }
}
