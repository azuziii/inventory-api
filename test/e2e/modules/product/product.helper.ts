import { INestApplication } from '@nestjs/common';
import {
  CreateProductInput,
  UpdateProductInput,
} from 'src/modules/product/inputs/product.input';
import * as request from 'supertest';
import { createRandomProductInput } from 'test/fake/product/product.fake';

const PRODUCT_FIELDS = `
  id
  name
  code
  price
  isSample
  customer {
    id
    name
  }
`;

export function createProduct(
  app: INestApplication,
  input:
    | CreateProductInput
    | Partial<CreateProductInput> = createRandomProductInput(),
) {
  const query = `
    mutation CreateProduct($input: CreateProductInput!) {
      createProduct(input: $input) {
        result {
          __typename
          ... on Product {
            ${PRODUCT_FIELDS}
          }
        }
      }
    }
  `;

  return request(app.getHttpServer()).post('/graphql').send({
    query,
    variables: { input },
  });
}

export function getProduct(app: INestApplication, id: string) {
  const query = `
    query GetProduct($id: ID!) {
      product(id: $id) {
        result {
          __typename
          ... on Product {
            ${PRODUCT_FIELDS}
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

export function updateProduct(
  app: INestApplication,
  input: UpdateProductInput,
) {
  const query = `
    mutation UpdateProduct($input: UpdateProductInput!) {
      updateProduct(input: $input) {
        result {
          __typename
          ... on Product {
            ${PRODUCT_FIELDS}
          }
        }
      }
    }
  `;

  return request(app.getHttpServer()).post('/graphql').send({
    query,
    variables: { input },
  });
}

export function deleteProduct(app: INestApplication, id: string) {
  const query = `
    mutation DeleteProduct($id: ID!) {
      deleteProduct(id: $id) {
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
