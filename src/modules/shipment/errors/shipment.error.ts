import { AlreadyExist } from 'src/shared/errors/already-exist.error';
import { NotFound } from 'src/shared/errors/not-found.error';

const ENTITY_NAME = 'Shipment';

export const ShipmentAlreadyExist = AlreadyExist(ENTITY_NAME);
export const ShipmentNotFound = NotFound(ENTITY_NAME);
