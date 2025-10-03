import {
  AlreadyExist,
  AlreadyExistProps,
} from 'src/common/errors/already-exist.error';
import { NotFound, NotFoundProps } from 'src/common/errors/not-found.error';

const ENTITY_TYPE = 'Product';

export class ProductAlreadyExist extends AlreadyExist {
  constructor(props: AlreadyExistProps) {
    super({
      entityType: ENTITY_TYPE,
      ...props,
    });
  }
}

export class ProductNotFound extends NotFound {
  constructor(props: NotFoundProps) {
    super({
      entityType: ENTITY_TYPE,
      ...props,
    });
  }
}
