import { INestApplication } from '@nestjs/common';
import { CreateShipmentInput } from 'src/modules/shipment/inputs/create-shipment.input';
import * as request from 'supertest';
import { createRandomShipmentInput } from 'test/fake/shipment/shipment.fake';

const Shipment_FIELDS = `
  id
  delivery_date
  shipment_number
  shipment_type
  customer {
    id
  }
`;

export function createShipment(
  app: INestApplication,
  createShipmentInput:
    | CreateShipmentInput
    | Partial<CreateShipmentInput> = createRandomShipmentInput(),
) {
  const query = `
    mutation CreateShipment($createShipmentInput: CreateShipmentInput!) {
      createShipment(input: $createShipmentInput) {
        result {
          __typename
          ... on Shipment {
            ${Shipment_FIELDS}
          }
        }
      }
    }
  `;

  return request(app.getHttpServer()).post('/graphql').send({
    query,
    variables: { createShipmentInput },
  });
}
