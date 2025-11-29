import { INestApplication } from '@nestjs/common';
import {
  CreateCustomerInput,
  UpdateCustomerInput,
} from 'src/modules/customer/inputs/customer.input';
import * as request from 'supertest';
import { createRandomCustomerInput } from 'test/fake/customer/customer.fake';

const CUSTOMER_FIELDS = `
  id
  name
  address
  city
  country
  ice
  contact_name
  contact_phone
  contact_email
`;

export function createCustomer(
  app: INestApplication,
  createCustomerInput:
    | CreateCustomerInput
    | Partial<CreateCustomerInput> = createRandomCustomerInput(),
) {
  const query = `
    mutation CreateCustomer($createCustomerInput: CreateCustomerInput!){
    createCustomer(input: $createCustomerInput) {
      result {
        __typename
        ... on Customer {
           ${CUSTOMER_FIELDS}
        }
      }
    }
  }`;

  return request(app.getHttpServer()).post('/graphql').send({
    query,
    variables: { createCustomerInput },
  });
}

export function getCustomer(app: INestApplication, id: string) {
  const query = `
    query GetCustomer($id: ID!){
    customer(id: $id) {
      result {
        __typename
        ... on Customer {
           ${CUSTOMER_FIELDS}
        }
      }
    }
  }`;

  return request(app.getHttpServer()).post('/graphql').send({
    query,
    variables: { id },
  });
}

export function getAllCustomers(app: INestApplication) {
  const query = `
   query {
  customers {
    result {
      __typename
      ... on CustomerList {
        items {
          ${CUSTOMER_FIELDS}
        }
        pagination {
          total
          page
          limit
          totalPages
          hasNextPage
          hasPrevPage
        }
      }
    }
  }
}`;

  return request(app.getHttpServer()).post('/graphql').send({
    query,
  });
}

export function updateCustomer(
  app: INestApplication,
  updateCustomerInput: UpdateCustomerInput,
) {
  const query = `mutation UpdateCustomer($updateCustomerInput: UpdateCustomerInput!){
    updateCustomer(input: $updateCustomerInput) {
      result {
        __typename
        ... on Customer {
          ${CUSTOMER_FIELDS}
        }
      }
    }
  }`;

  return request(app.getHttpServer()).post('/graphql').send({
    query,
    variables: { updateCustomerInput },
  });
}

export function deleteCustomer(app: INestApplication, id: string) {
  const query = `
  mutation DeleteCustomer($id: ID!){
    deleteCustomer(id: $id) {
      result {
        __typename
        ... on DeleteResponse {
          id
        }
      }
    }
  }`;

  return request(app.getHttpServer()).post('/graphql').send({
    query,
    variables: { id },
  });
}
