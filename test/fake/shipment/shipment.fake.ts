import { faker } from '@faker-js/faker';
import { ShipmentType } from 'src/modules/shipment/enums/shipment-type.enum';
import { CreateShipmentInput } from 'src/modules/shipment/inputs/create-shipment.input';

export function createRandomShipmentInput(): CreateShipmentInput {
  return {
    customer_id: faker.string.uuid(),
    delivery_date: faker.date.anytime(),
    shipment_type: ShipmentType.Outbound,
    shipment_number: faker.number
      .int({
        min: 1,
        max: 100000000,
      })
      .toString(),
  };
}
