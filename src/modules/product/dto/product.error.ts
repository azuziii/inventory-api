import {
  AlreadyExist,
  AlreadyExistProps,
} from 'src/common/errors/alread-exist.error';

export class ProductAlreadyExist extends AlreadyExist {
  constructor(props: AlreadyExistProps) {
    super({
      entityType: 'Product',
      ...props,
    });
  }
}
