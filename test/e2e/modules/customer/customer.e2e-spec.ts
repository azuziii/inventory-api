import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { CustomerOutput } from 'src/modules/customer/outputs/customer.output';
import { CustomerAlreadyExist } from 'src/shared/domain-errors';
import { InstanceOfBaseResponse } from 'src/shared/responses/base.response';
import * as request from 'supertest';
import { createE2ETestingModule } from 'test/e2e-testing-module';
import { createRandomCustomerInput } from 'test/fake/customer/customer.fake';

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

  let customerInputDummyData = createRandomCustomerInput();

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
    expect(result.name).toBe(customerInputDummyData.name);
    expect(result.ice).toBe(customerInputDummyData.ice);
    expect(result.id).toBeDefined();
  });

  it('CREATE:CUSTOMER should fail to create a new customer because ice already exists', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CUSTOMER_QUERIES.create,
        variables: { input: customerInputDummyData },
      })
      .expect(200);

    const { result } = response.body.data
      .createCustomer as InstanceOfBaseResponse<
      InstanceType<typeof CustomerAlreadyExist>
    >;

    expect(result.__typename).toBe('CustomerAlreadyExist');
  });

  it('CREATE:CUSTOMER should fail to create a new customer because not all fields are present', async () => {
    const customerDto: Partial<typeof customerInputDummyData> =
      customerInputDummyData;
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
});
