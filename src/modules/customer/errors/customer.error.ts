import { AlreadyExist } from 'src/common/errors/already-exist.error';
import { InUse } from 'src/common/errors/in-use.error';
import { NotFound } from 'src/common/errors/not-found.error';

const ENTITY_TYPE = 'Customer';

export const CustomerAlreadyExist = AlreadyExist(ENTITY_TYPE);
export const CustomerNotFound = NotFound(ENTITY_TYPE);
export const CustomerInUse = InUse(ENTITY_TYPE);
