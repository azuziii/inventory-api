import { AlreadyExist } from 'src/common/errors/already-exist.error';
import { InUse } from 'src/common/errors/in-use.error';
import { NotFound } from 'src/common/errors/not-found.error';

const ENTITY_NAME = 'Product';

export const ProductAlreadyExist = AlreadyExist(ENTITY_NAME);
export const ProductNotFound = NotFound(ENTITY_NAME);
export const ProductInUse = InUse(ENTITY_NAME);
