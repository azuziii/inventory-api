import { createUnionType } from '@nestjs/graphql';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { DeleteResponse } from 'src/shared/responses/delete.response';
import { ShipmentInUse } from '../errors/shipment.error';

export type DeleteShipmentUnion = typeof DeleteShipmentUnion;
export const DeleteShipmentUnion = createUnionType({
  name: 'DeleteShipmentUnion',
  types: () => [DeleteResponse, ShipmentInUse, InvalidDataException],
});
