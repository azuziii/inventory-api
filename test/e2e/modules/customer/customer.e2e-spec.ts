import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { CreateCustomerInput } from 'src/modules/customer/inputs/customer.input';
import { CustomerOutput } from 'src/modules/customer/outputs/customer.output';
import {
  CustomerAlreadyExist,
  CustomerNotFound,
} from 'src/shared/domain-errors';
import { InstanceOfBaseResponse } from 'src/shared/responses/base.response';
import { DeleteResponse } from 'src/shared/responses/delete.response';
import * as request from 'supertest';
import { createE2ETestingModule } from 'test/e2e-testing-module';
import {
  createRandomCustomerInput,
  createRandomCustomerUpdate,
} from 'test/fake/customer/customer.fake';

const CUSTOMER_QUERIES = {
  get: `
  query GetCustomer($id: ID!){
    customer(id: $id) {
      result {
        __typename
        ... on Customer {
          id
          name
          address
          city
          country
          ice
          contact_name
          contact_phone
          contact_email
        }
      }
    }
  }`,
  create: `
  mutation CreateCustomer($input: CreateCustomerInput!){
    createCustomer(input: $input) {
      result {
        __typename
        ... on Customer {
          id
          name
          address
          city
          country
          ice
          contact_name
          contact_phone
          contact_email
        }
      }
    }
  }`,
  update: `
  mutation UpdateCustomer($input: UpdateCustomerInput!){
    updateCustomer(input: $input) {
      result {
        __typename
        ... on Customer {
          id
          name
          address
          city
          country
          ice
          contact_name
          contact_phone
          contact_email
        }
      }
    }
  }`,
  delete: `
  mutation DeleteCustomer($id: ID!){
    deleteCustomer(id: $id) {
      result {
        __typename
        ... on DeleteResponse {
          id
        }
      }
    }
  }`,
};

describe('Customer E2E', () => {
  let app: INestApplication;
  let module: TestingModule;
  let customerInputDummyData = createRandomCustomerInput();
  let customers: CustomerOutput[] = [];

  beforeAll(async () => {
    module = await createE2ETestingModule();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
    if (module) await module.close();
  });

  it('CREATE:CUSTOMER should create a new customer', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CUSTOMER_QUERIES.create,
        variables: { input: customerInputDummyData },
      })
      .expect(200);

    const { result } = response.body.data
      .createCustomer as InstanceOfBaseResponse<CustomerOutput>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('Customer');
    expect(result.name).toBe(customerInputDummyData.name);
    expect(result.ice).toBe(customerInputDummyData.ice);
    expect(result.id).toBeDefined();

    customers.push(result);
  });

  it('GET:CUSTOMER should get customer', async () => {
    const targetCustomerId = customers[0].id;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CUSTOMER_QUERIES.get,
        variables: {
          id: targetCustomerId,
        },
      })
      .expect(200);

    const { result } = response.body.data
      .customer as InstanceOfBaseResponse<CustomerOutput>;

    expect(result.__typename).toBe('Customer');
    expect(result.id).toBe(targetCustomerId);
  });

  it('CREATE:CUSTOMER should fail to create a new customer because ice already exists', async () => {
    const customerInput = createRandomCustomerInput();
    customerInput.ice = customerInputDummyData.ice;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CUSTOMER_QUERIES.create,
        variables: { input: customerInput },
      })
      .expect(200);

    const { result } = response.body.data
      .createCustomer as InstanceOfBaseResponse<
      InstanceType<typeof CustomerAlreadyExist>
    >;

    expect(result.__typename).toBe('CustomerAlreadyExist');
  });

  it('CREATE:CUSTOMER should fail to create a new customer because not all fields are present', async () => {
    const customerDto: Partial<CreateCustomerInput> =
      createRandomCustomerInput();
    delete customerDto.name;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CUSTOMER_QUERIES.create,
        variables: { input: customerDto },
      })
      .expect(200);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.length).toBeGreaterThan(0);
  });

  it('UPDATE:CUSTOMER should update customer', async () => {
    const newCustomerName = createRandomCustomerUpdate().name;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CUSTOMER_QUERIES.update,
        variables: {
          input: {
            id: customers[0].id,
            name: newCustomerName,
          },
        },
      })
      .expect(200);

    const { result } = response.body.data
      .updateCustomer as InstanceOfBaseResponse<CustomerOutput>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('Customer');
    expect(result.name).toBe(newCustomerName);
  });

  it('DELETE:CUSTOMER should delete customer', async () => {
    const targetCustomerId = customers[0].id;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CUSTOMER_QUERIES.delete,
        variables: {
          id: targetCustomerId,
        },
      })
      .expect(200);

    const { result } = response.body.data
      .deleteCustomer as InstanceOfBaseResponse<DeleteResponse>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('DeleteResponse');
    expect(result.id).toBe(targetCustomerId);
  });

  it('GET:CUSTOMER should fail to get customer because it does not exist', async () => {
    const targetCustomerId = customers[0].id;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CUSTOMER_QUERIES.get,
        variables: {
          id: targetCustomerId,
        },
      })
      .expect(200);

    const { result } = response.body.data.customer as InstanceOfBaseResponse<
      InstanceType<typeof CustomerNotFound>
    >;

    expect(result.__typename).toBe('CustomerNotFound');
  });
});
