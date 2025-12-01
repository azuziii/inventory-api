import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { CustomerOutput } from 'src/modules/customer/outputs/customer.output';
import { OrderOutput } from 'src/modules/order/outputs/order.output';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { InstanceOfBaseResponse } from 'src/shared/responses/base.response';
import {
  cleanupTestEnvironment,
  initializeTestEnvironment,
} from 'test/e2e.helper';
import { createRandomOrderItemInput } from 'test/fake/order-item/order-item.fake';
import { createRandomOrderInput } from 'test/fake/order/order.fake';
import { createRandomProductInput } from 'test/fake/product/product.fake';
import { createCustomer } from '../customer/customer.helper';
import { createProduct } from '../product/product.helper';
import { createOrder } from './order.helper';

const MIN_ITEM_QUANTITY = 1;

describe('Customer E2E', () => {
  let app: INestApplication;
  let module: TestingModule;

  let customer: CustomerOutput;
  let product: CustomerOutput;
  let product2: CustomerOutput;

  let order: OrderOutput;
  let order2: OrderOutput;

  beforeAll(async () => {
    [app, module] = await initializeTestEnvironment();

    const customer1Resp = await createCustomer(app);
    customer = customer1Resp.body.data.createCustomer.result;

    const product1Resp = await createProduct(app, {
      ...createRandomProductInput(),
      customer_id: customer.id,
    });
    product = product1Resp.body.data.createProduct.result;

    const product2Resp = await createProduct(app, {
      ...createRandomProductInput(),
      customer_id: customer.id,
    });
    product2 = product2Resp.body.data.createProduct.result;
  });

  afterAll(async () => {
    await cleanupTestEnvironment(module, app);
  });

  it('CREATE:ORDER should create a new order', async () => {
    const randomOrder = createRandomOrderInput();

    const randomItem = createRandomOrderItemInput();
    randomItem.product_id = product.id;

    const response = await createOrder(app, {
      ...randomOrder,
      customer_id: customer.id,
      items: [randomItem],
    }).expect(200);

    console.log(response.body);

    expect(response.body.data.createOrder).toBeDefined();

    const { result } = response.body.data
      .createOrder as InstanceOfBaseResponse<OrderOutput>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('Order');
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items[0].id).toBeDefined();

    order = result;
  });

  it('CREATE:ORDER should create a new order with multiple items', async () => {
    const randomOrder = createRandomOrderInput();

    const randomItem = createRandomOrderItemInput();
    randomItem.product_id = product.id;

    const randomItem2 = createRandomOrderItemInput();
    randomItem2.product_id = product2.id;

    const response = await createOrder(app, {
      ...randomOrder,
      customer_id: customer.id,
      items: [randomItem, randomItem2],
    }).expect(200);

    console.log(response.body);

    expect(response.body.data.createOrder).toBeDefined();

    const { result } = response.body.data
      .createOrder as InstanceOfBaseResponse<OrderOutput>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('Order');
    expect(result.items.length).toBe(2);
    expect(result.items[0].id).toBeDefined();
    expect(result.items[1].id).toBeDefined();

    order2 = result;
  });

  it('CREATE:ORDER should create a new order and merge similar items', async () => {
    const randomOrder = createRandomOrderInput();

    const randomItem = createRandomOrderItemInput();
    randomItem.product_id = product.id;

    const randomItem2 = createRandomOrderItemInput();
    randomItem2.product_id = product.id;

    const response = await createOrder(app, {
      ...randomOrder,
      customer_id: customer.id,
      items: [randomItem, randomItem2],
    }).expect(200);

    console.log(response.body);

    expect(response.body.data.createOrder).toBeDefined();

    const { result } = response.body.data
      .createOrder as InstanceOfBaseResponse<OrderOutput>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('Order');
    expect(result.items.length).toBe(1);
    expect(result.items[0].id).toBeDefined();
    expect(result.items[0].quantity).toBe(
      randomItem.quantity + randomItem2.quantity,
    );

    order = result;
  });

  it("CREATE:ORDER should fail to create order if items aren't provided", async () => {
    const randomOrder = createRandomOrderInput();

    const response = await createOrder(app, {
      ...randomOrder,
      customer_id: customer.id,
    }).expect(200);

    expect(response.body.data.createOrder).toBeDefined();

    const { result } = response.body.data.createOrder as InstanceOfBaseResponse<
      InstanceType<typeof InvalidDataException>
    >;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('InvalidData');
  });

  it('CREATE:ORDER should fail to create order if date is invalid', async () => {
    const randomOrder = createRandomOrderInput();

    const response = await createOrder(app, {
      ...randomOrder,
      customer_id: customer.id,
      order_date: 123 as unknown as Date,
    }).expect(200);

    expect(response.body.data.createOrder).toBeDefined();

    const { result } = response.body.data.createOrder as InstanceOfBaseResponse<
      InstanceType<typeof InvalidDataException>
    >;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('InvalidData');
  });

  it('CREATE:ORDER should fail to create order if customer does not exist', async () => {
    const randomOrder = createRandomOrderInput();

    const randomItem = createRandomOrderItemInput();

    const response = await createOrder(app, {
      ...randomOrder,
      items: [randomItem],
    }).expect(200);

    expect(response.body.data.createOrder).toBeDefined();

    const { result } = response.body.data.createOrder as InstanceOfBaseResponse<
      InstanceType<typeof InvalidDataException>
    >;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('CustomerNotFound');
  });

  it(`CREATE:ORDER should fail to create order if quantity of item is less than minimum quantity (${MIN_ITEM_QUANTITY})`, async () => {
    const randomOrder = createRandomOrderInput();
    randomOrder.customer_id = customer.id;

    const randomItem = createRandomOrderItemInput();
    randomItem.product_id = product.id;
    randomItem.quantity = MIN_ITEM_QUANTITY - 1;

    const response = await createOrder(app, {
      ...randomOrder,
      items: [randomItem],
    }).expect(200);

    expect(response.body.data.createOrder).toBeDefined();

    const { result } = response.body.data.createOrder as InstanceOfBaseResponse<
      InstanceType<typeof InvalidDataException>
    >;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('InvalidData');
  });

  it('CREATE:ORDER should fail to create order if product does not exist', async () => {
    const randomOrder = createRandomOrderInput();
    randomOrder.customer_id = customer.id;

    const randomItem = createRandomOrderItemInput();

    const response = await createOrder(app, {
      ...randomOrder,
      items: [randomItem],
    }).expect(200);

    expect(response.body.data.createOrder).toBeDefined();

    const { result } = response.body.data.createOrder as InstanceOfBaseResponse<
      InstanceType<typeof InvalidDataException>
    >;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('ProductNotFound');
  });

  it('CREATE:ORDER should fail to create order if order_number already exists in the same year', async () => {
    const randomOrder = createRandomOrderInput();
    randomOrder.customer_id = customer.id;
    randomOrder.order_date = order.order_date;
    randomOrder.order_number = order.order_number;

    const randomItem = createRandomOrderItemInput();
    randomItem.product_id = product.id;

    const response = await createOrder(app, {
      ...randomOrder,
      items: [randomItem],
    }).expect(200);

    expect(response.body.data.createOrder).toBeDefined();

    const { result } = response.body.data.createOrder as InstanceOfBaseResponse<
      InstanceType<typeof InvalidDataException>
    >;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('OrderAlreadyExist');
  });
});
