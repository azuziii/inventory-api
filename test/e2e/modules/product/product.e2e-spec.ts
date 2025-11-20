import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { CustomerOutput } from 'src/modules/customer/outputs/customer.output';
import { ProductOutput } from 'src/modules/product/outputs/product.output';
import { ProductAlreadyExist, ProductNotFound } from 'src/shared/domain-errors';
import { InstanceOfBaseResponse } from 'src/shared/responses/base.response';
import { DeleteResponse } from 'src/shared/responses/delete.response';
import { createE2ETestingModule } from 'test/e2e-testing-module';
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from 'test/e2e/modules/product/product.helper';
import { createRandomProductInput } from 'test/fake/product/product.fake';
import { createCustomer, deleteCustomer } from '../customer/customer.helper';

describe('Product E2E', () => {
  let app: INestApplication;
  let module: TestingModule;

  let customer1: CustomerOutput;
  let customer2: CustomerOutput;

  let product1: ProductOutput;
  let product2: ProductOutput;
  let product3: ProductOutput;

  beforeAll(async () => {
    module = await createE2ETestingModule();
    app = module.createNestApplication();
    await app.init();

    const resp1 = await createCustomer(app);
    customer1 = resp1.body.data.createCustomer.result;

    const resp2 = await createCustomer(app);
    customer2 = resp2.body.data.createCustomer.result;
  });

  afterAll(async () => {
    if (app) await app.close();
    if (module) await module.close();

    await deleteCustomer(app, customer1.id);
    await deleteCustomer(app, customer2.id);
  });

  it('CREATE:PRODUCT should create a new product', async () => {
    const randomProduct = createRandomProductInput();
    const response = await createProduct(app, {
      ...randomProduct,
      customer_id: customer1.id,
      isSample: false,
    });

    const { result } = response.body.data
      .createProduct as InstanceOfBaseResponse<ProductOutput>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('Product');
    expect(result.isSample).toBe(false);
    expect(result.name).toBe(randomProduct.name);
    expect(result.id).toBeDefined();

    product1 = result;
  });

  it('CREATE:PRODUCT should create a new sample product', async () => {
    const randomProduct = createRandomProductInput();
    const response = await createProduct(app, {
      ...randomProduct,
      customer_id: customer2.id,
      isSample: true,
    }).expect(200);

    const { result } = response.body.data
      .createProduct as InstanceOfBaseResponse<ProductOutput>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('Product');
    expect(result.isSample).toBe(true);
    expect(result.name).toBe(`Sample ${randomProduct.name}`);
    expect(result.id).toBeDefined();

    product2 = result;
  });

  it('CREATE:PRODUCT should fail due to unique constraint violation when a product with the same name already exists for the given customer.', async () => {
    const productInput = createRandomProductInput();
    productInput.customer_id = product1.customer.id;
    productInput.name = product1.name;

    const response = await createProduct(app, productInput).expect(200);

    const { result } = response.body.data
      .createProduct as InstanceOfBaseResponse<
      InstanceType<typeof ProductAlreadyExist>
    >;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('ProductAlreadyExist');
  });

  it('CREATE:PRODUCT should create a product with an existing name for another customer', async () => {
    const productInput = createRandomProductInput();
    const response = await createProduct(app, {
      ...productInput,
      customer_id: customer2.id,
      name: product1.name,
      isSample: false,
    }).expect(200);

    const { result } = response.body.data
      .createProduct as InstanceOfBaseResponse<ProductOutput>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('Product');
    expect(result.isSample).toBe(false);
    expect(result.customer.id).toBe(customer2.id);
    expect(result.name).toBe(product1.name);
    expect(result.id).toBeDefined();

    product3 = result;
  });

  it('GET:PRODUCT should get product', async () => {
    const targetProductId = product1.id;

    const response = await getProduct(app, targetProductId).expect(200);

    const { result } = response.body.data
      .product as InstanceOfBaseResponse<ProductOutput>;

    expect(result.__typename).toBe('Product');
    expect(result.id).toBe(targetProductId);
  });

  it('UPDATE:PRODUCT should fail due to unique constraint violation when reassigning the product to a customer who already owns a product with the same name', async () => {
    const targetProductId = product3.id;
    const customerId = product1.customer.id;

    const response = await updateProduct(app, {
      id: targetProductId,
      customer_id: customerId,
    }).expect(200);

    const { result } = response.body.data
      .updateProduct as InstanceOfBaseResponse<ProductOutput>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('ProductAlreadyExist');
  });

  it('UPDATE:PRODUCT should fail when renaming a product to a name that already exists for the target customer', async () => {
    const targetProductId = product3.id;
    const newName = product2.name.split('Sample ')[1];

    const response = await updateProduct(app, {
      id: targetProductId,
      name: newName,
    }).expect(200);

    const { result } = response.body.data
      .updateProduct as InstanceOfBaseResponse<ProductOutput>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('ProductAlreadyExist');
  });

  it('UPDATE:PRODUCT should update product', async () => {
    const targetProductId = product1.id;
    const newProductName = createRandomProductInput().name;

    const response = await updateProduct(app, {
      id: targetProductId,
      name: newProductName,
    }).expect(200);

    const { result } = response.body.data
      .updateProduct as InstanceOfBaseResponse<ProductOutput>;

    expect(result.__typename).toBe('Product');
    expect(result.id).toBe(targetProductId);
    expect(result.name).toBe(newProductName);

    product1 = result;
  });

  it('UPDATE:PRODUCT should update sample product name', async () => {
    const targetProductId = product2.id;
    const newProductName = createRandomProductInput().name;

    const response = await updateProduct(app, {
      id: targetProductId,
      name: newProductName,
    }).expect(200);

    const { result } = response.body.data
      .updateProduct as InstanceOfBaseResponse<ProductOutput>;

    expect(result.__typename).toBe('Product');
    expect(result.id).toBe(targetProductId);
    expect(result.name).toBe(`Sample ${newProductName}`);

    product2 = result;
  });

  it('DELETE:PRODUCT should delete product', async () => {
    const targetProductId = product1.id;

    const response = await deleteProduct(app, targetProductId).expect(200);

    const { result } = response.body.data
      .deleteProduct as InstanceOfBaseResponse<DeleteResponse>;

    expect(result).toBeDefined();
    expect(result.__typename).toBe('DeleteResponse');
    expect(result.id).toBe(targetProductId);
  });

  it('GET:PRODUCT should fail to get product because it does not exist', async () => {
    const targetProductId = product1.id;

    const response = await getProduct(app, targetProductId).expect(200);

    const { result } = response.body.data.product as InstanceOfBaseResponse<
      InstanceType<typeof ProductNotFound>
    >;

    expect(result.__typename).toBe('ProductNotFound');
  });

  // Add more test cases for ProductInUse
});
