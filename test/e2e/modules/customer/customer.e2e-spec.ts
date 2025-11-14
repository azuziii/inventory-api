import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { CreateCustomerInput } from 'src/modules/customer/inputs/customer.input';
import { CustomerOutput } from 'src/modules/customer/outputs/customer.output';
import { InstanceOfBaseResponse } from 'src/shared/responses/base.response';
import * as request from 'supertest';
import { createE2ETestingModule } from 'test/e2e-testing-module';

const CUSTOMER_QUERIES = {
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
};

describe('Customer E2E', () => {
  let app: INestApplication;
  let module: TestingModule;

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
    const customerDto = {
      name: 'Test Customer 1',
      address: '123 Main St',
      city: 'Test City',
      country: 'Test Country',
      ice: 'ICE-9001',
      contact_name: 'Contact 1',
      contact_phone: '555-1234',
      contact_email: 'test1@example.com',
    } as CreateCustomerInput;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CUSTOMER_QUERIES.create,
        variables: { input: customerDto },
      })
      .expect(200);

    const { result } = response.body.data
      .createCustomer as InstanceOfBaseResponse<CustomerOutput>;

    expect(result).toBeDefined();
    expect(result.name).toBe(customerDto.name);
    expect(result.ice).toBe(customerDto.ice);
    expect(result.id).toBeDefined();
  });
});
