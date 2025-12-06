import { INestApplication } from '@nestjs/common';
import { CreateShipmentInput } from 'src/modules/shipment/inputs/create-shipment.input';
import { UpdateShipmentInput } from 'src/modules/shipment/inputs/update-shipment.input';
import * as request from 'supertest';
import {
  createRandomShipmentInput,
  updateRandomShipmentInput,
} from 'test/fake/shipment/shipment.fake';

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

export function updateShipment(
  app: INestApplication,
  updateShipmentInput:
    | UpdateShipmentInput
    | Partial<UpdateShipmentInput> = updateRandomShipmentInput(),
) {
  const query = `
    mutation UpdateShipment($updateShipmentInput: UpdateShipmentInput!) {
      updateShipment(input: $updateShipmentInput) {
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
    variables: { updateShipmentInput },
  });
}

export function deleteShipment(app: INestApplication, id: string) {
  const query = `
    mutation DeleteShipment($id: ID!) {
      deleteShipment(id: $id) {
        result {
          __typename
          ... on DeleteResponse {
            id
          }
        }
      }
    }
  `;

  return request(app.getHttpServer()).post('/graphql').send({
    query,
    variables: { id },
  });
}
