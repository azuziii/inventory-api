import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { CustomerOutput } from 'src/modules/customer/outputs/customer.output';
import { ShipmentOutput } from 'src/modules/shipment/outputs/shipment.output';
import { InstanceOfBaseResponse } from 'src/shared/responses/base.response';
import {
  cleanupTestEnvironment,
  initializeTestEnvironment,
} from 'test/e2e.helper';
import { createRandomShipmentInput } from 'test/fake/shipment/shipment.fake';
import { createCustomer } from '../customer/customer.helper';
import { createShipment } from './shipment.helper';

describe('Customer E2E', () => {
  let app: INestApplication;
  let module: TestingModule;

  let customer: CustomerOutput;

  let shipment: ShipmentOutput;

  beforeAll(async () => {
    [app, module] = await initializeTestEnvironment();

    const customer1Resp = await createCustomer(app);
    customer = customer1Resp.body.data.createCustomer.result;
  });

  afterAll(async () => {
    await cleanupTestEnvironment(module, app);
  });

  it('CREATE:SHIPMENT should create a new shipment', async () => {
    const randomShipment = createRandomShipmentInput();

    const response = await createShipment(app, {
      ...randomShipment,
      customer_id: customer.id,
    }).expect(200);

    expect(response.body.data.createShipment).toBeDefined();

    const { result } = response.body.data
      .createShipment as InstanceOfBaseResponse<ShipmentOutput>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('Shipment');

    shipment = result;
  });
});
