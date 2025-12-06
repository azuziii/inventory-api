import { AlreadyExist } from 'src/shared/errors/already-exist.error';
import { InUse } from 'src/shared/errors/in-use.error';
import { NotFound } from 'src/shared/errors/not-found.error';

const ENTITY_NAME = 'Shipment';

export const ShipmentAlreadyExist = AlreadyExist(ENTITY_NAME);
export const ShipmentNotFound = NotFound(ENTITY_NAME);
export const ShipmentInUse = InUse(ENTITY_NAME);
