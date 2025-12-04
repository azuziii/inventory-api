import { createUnionType } from '@nestjs/graphql';
import { CustomerNotFound } from 'src/shared/domain-errors';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { ShipmentAlreadyExist } from '../errors/shipment.error';
import { ShipmentOutput } from '../outputs/shipment.output';

export type CreateShipmentUnion = typeof CreateShipmentUnion;
export const CreateShipmentUnion = createUnionType({
  name: 'CreateShipmentUnion',
  types: () => [
    ShipmentOutput,
    ShipmentAlreadyExist,
    InvalidDataException,
    CustomerNotFound,
  ],
});
