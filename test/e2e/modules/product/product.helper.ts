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
  createProductInput:
    | CreateProductInput
    | Partial<CreateProductInput> = createRandomProductInput(),
) {
  const query = `
    mutation CreateProduct($createProductInput: CreateProductInput!) {
      createProduct(input: $createProductInput) {
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
    variables: { createProductInput },
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
  updateProductInputupdate: UpdateProductInput,
) {
  const query = `
    mutation UpdateProduct($updateProductInputupdate: UpdateProductInput!) {
      updateProduct(input: $updateProductInputupdate) {
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
    variables: { updateProductInputupdate },
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
