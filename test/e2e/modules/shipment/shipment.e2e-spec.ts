import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { CustomerOutput } from 'src/modules/customer/outputs/customer.output';
import { ShipmentType } from 'src/modules/shipment/enums/shipment-type.enum';
import { ShipmentOutput } from 'src/modules/shipment/outputs/shipment.output';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
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

  it('CREATE:SHIPMENT should fail to create a new shipment when customer does not exist', async () => {
    const randomShipment = createRandomShipmentInput();

    const response = await createShipment(app, randomShipment).expect(200);

    expect(response.body.data.createShipment).toBeDefined();

    const { result } = response.body.data
      .createShipment as InstanceOfBaseResponse<ShipmentOutput>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('CustomerNotFound');
  });

  it('CREATE:SHIPMENT should fail to create a new shipment if customer_id is invalid', async () => {
    const randomShipment = createRandomShipmentInput();
    randomShipment.customer_id = 'test';

    const response = await createShipment(app, randomShipment).expect(200);

    const { result } = response.body.data
      .createShipment as InstanceOfBaseResponse<
      InstanceType<typeof InvalidDataException>
    >;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('InvalidData');
  });

  it('CREATE:SHIPMENT should fail to create a new shipment if date is invalid', async () => {
    const randomShipment = createRandomShipmentInput();

    randomShipment.delivery_date = 'test' as unknown as Date;

    const response = await createShipment(app, randomShipment).expect(200);

    expect(response.body.data.createShipment).toBeDefined();

    const { result } = response.body.data
      .createShipment as InstanceOfBaseResponse<ShipmentOutput>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('InvalidData');
  });

  it('CREATE:SHIPMENT should fail to create a new shipment if shipment_type is invalid', async () => {
    const randomShipment = createRandomShipmentInput();
    randomShipment.shipment_type = 'test' as unknown as ShipmentType;

    const response = await createShipment(app, randomShipment).expect(200);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body.errors[0].message).toMatch(
      /"test".+"ShipmentType"\s+enum/,
    );
  });
});
