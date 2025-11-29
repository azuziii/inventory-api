import { INestApplication } from '@nestjs/common';
import {
  CreateOrderInput,
  UpdateOrderInput,
} from 'src/modules/order/inputs/order.input';
import * as request from 'supertest';
import { createRandomOrderInput } from 'test/fake/order/order.fake';

const ORDER_FIELDS = `
  id
  order_number
  order_date
  order_year
  customer {
    id
  }
  items {
    id
    product_name
    product_price
    quantity
    total_shipped
    product {
        id
    }
  }
`;

export function createOrder(
  app: INestApplication,
  createOrderInput:
    | CreateOrderInput
    | Partial<CreateOrderInput> = createRandomOrderInput(),
) {
  const query = `
    mutation CreateOrder($createOrderInput: CreateOrderInput!) {
      createOrder(input: $createOrderInput) {
        result {
          __typename
          ... on Order {
            ${ORDER_FIELDS}
          }
        }
      }
    }
  `;

  return request(app.getHttpServer()).post('/graphql').send({
    query,
    variables: { createOrderInput },
  });
}

export function getOrder(app: INestApplication, id: string) {
  const query = `
    query GetOrder($id: ID!) {
      order(id: $id) {
        result {
          __typename
          ... on Order {
            ${ORDER_FIELDS}
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

export function updateOrder(
  app: INestApplication,
  updateOrderInput: UpdateOrderInput,
) {
  const query = `
    mutation UpdateOrder($updateOrderInput: UpdateOrderInput!) {
      updateOrder(input: $updateOrderInput) {
        result {
          __typename
          ... on Order {
            ${ORDER_FIELDS}
          }
        }
      }
    }
  `;

  return request(app.getHttpServer()).post('/graphql').send({
    query,
    variables: { updateOrderInput },
  });
}

export function deleteOrder(app: INestApplication, id: string) {
  const query = `
    mutation DeleteOrder($id: ID!) {
      deleteOrder(id: $id) {
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
