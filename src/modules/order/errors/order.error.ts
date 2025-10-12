import { AlreadyExist } from 'src/shared/errors/already-exist.error';
import { InUse } from 'src/shared/errors/in-use.error';
import { NotFound } from 'src/shared/errors/not-found.error';

const ENTITY_NAME = 'Order';

export const OrderAlreadyExist = AlreadyExist(ENTITY_NAME);
export const OrderNotFound = NotFound(ENTITY_NAME);
export const OrderInUse = InUse(ENTITY_NAME);
