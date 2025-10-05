import { AlreadyExist } from 'src/common/errors/already-exist.error';
import { NotFound } from 'src/common/errors/not-found.error';

const ENTITY_TYPE = 'Product';

export const ProductAlreadyExist = AlreadyExist(ENTITY_TYPE);
export const ProductNotFound = NotFound(ENTITY_TYPE);
