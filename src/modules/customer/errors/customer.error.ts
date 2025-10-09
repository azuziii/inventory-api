import { AlreadyExist } from 'src/shared/errors/already-exist.error';
import { InUse } from 'src/shared/errors/in-use.error';
import { NotFound } from 'src/shared/errors/not-found.error';

const ENTITY_NAME = 'Customer';

export const CustomerAlreadyExist = AlreadyExist(ENTITY_NAME);
export const CustomerNotFound = NotFound(ENTITY_NAME);
export const CustomerInUse = InUse(ENTITY_NAME);
