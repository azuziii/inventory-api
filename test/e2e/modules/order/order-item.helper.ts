import { INestApplication } from '@nestjs/common';
import { CreateOrderItemInput } from 'src/modules/order-item/inputs/order-item.input';
import { UpdateOrderInput } from 'src/modules/order/inputs/order.input';
import * as request from 'supertest';
import { createRandomOrderItemInput } from 'test/fake/order-item/order-item.fake';

const ORDER_ITEM_FIELDS = `
  id
  product_name
  product_price
  quantity
  total_shipped
  product {
    id
  }
`;

export function createOrderItem(
  app: INestApplication,
  createOrderItemInput:
    | CreateOrderItemInput
    | Partial<CreateOrderItemInput> = createRandomOrderItemInput(),
) {
  const query = `
    mutation CreateOrderItem($createOrderItemInput: createOrderItemInput!) {
      createOrderItem(input: $createOrderItemInput) {
        result {
          __typename
          ... on OrderItem {
            ${ORDER_ITEM_FIELDS}
          }
        }
      }
    }
  `;

  return request(app.getHttpServer()).post('/graphql').send({
    query,
    variables: { createOrderItemInput },
  });
}

export function getOrderItem(app: INestApplication, id: string) {
  const query = `
    query GetOrderItem($id: ID!) {
      orderItem(id: $id) {
        result {
          __typename
          ... on OrderItem {
            ${ORDER_ITEM_FIELDS}
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

export function updateOrderItem(
  app: INestApplication,
  updateOrderItemInput: UpdateOrderInput,
) {
  const query = `
    mutation UpdateOrderItem($updateOrderInput: UpdateOrderItemInput!) {
      updateOrderItem(input: $updateOrderInput) {
        result {
          __typename
          ... on OrderItem {
            ${ORDER_ITEM_FIELDS}
          }
        }
      }
    }
  `;

  return request(app.getHttpServer()).post('/graphql').send({
    query,
    variables: { updateOrderItemInput },
  });
}

export function deleteOrderItem(app: INestApplication, id: string) {
  const query = `
    mutation DeleteOrderItem($id: ID!) {
      deleteOrderItem(id: $id) {
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
