import { AlreadyExist } from 'src/common/errors/already-exist.error';
import { InUse } from 'src/common/errors/in-use.error';
import { NotFound } from 'src/common/errors/not-found.error';

const ENTITY_NAME = 'Customer';

export const CustomerAlreadyExist = AlreadyExist(ENTITY_NAME);
export const CustomerNotFound = NotFound(ENTITY_NAME);
export const CustomerInUse = InUse(ENTITY_NAME);
