import { registerEnumType } from '@nestjs/graphql';

export enum ShipmentType {
  Outbound = 'Outbound',
  Return = 'Return',
}

registerEnumType(ShipmentType, {
  name: 'ShipmentType',
});
