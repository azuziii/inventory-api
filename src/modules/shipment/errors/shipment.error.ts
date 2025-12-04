import { AlreadyExist } from 'src/shared/errors/already-exist.error';

const ENTITY_NAME = 'Shipment';

export const ShipmentAlreadyExist = AlreadyExist(ENTITY_NAME);
