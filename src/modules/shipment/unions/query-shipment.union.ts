import { createUnionType } from '@nestjs/graphql';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { ShipmentNotFound } from '../errors/shipment.error';
import { ShipmentOutput } from '../outputs/shipment.output';

export type ShipmentQueryUnion = typeof ShipmentQueryUnion;
export const ShipmentQueryUnion = createUnionType({
  name: 'ShipmentQueryUnion',
  types: () => [ShipmentOutput, ShipmentNotFound, InvalidDataException],
});
