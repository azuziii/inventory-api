import { faker } from '@faker-js/faker';
import { CreateOrderItemInput } from 'src/modules/order-item/inputs/order-item.input';

const maxQuantity = 1000000;

export function createRandomOrderItemInput(): Omit<
  CreateOrderItemInput,
  'order_id'
> {
  return {
    product_id: faker.string.uuid(),
    quantity: faker.number.int({ min: 1, max: maxQuantity }),
  };
}

export function createRandomOrderItemInputWithOrderId(): CreateOrderItemInput {
  return {
    order_id: faker.string.uuid(),
    product_id: faker.string.uuid(),
    quantity: faker.number.int({ min: 1, max: maxQuantity }),
  };
}
