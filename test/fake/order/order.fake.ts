import { faker } from '@faker-js/faker';
import {
  CreateOrderInput,
  UpdateOrderInput,
} from 'src/modules/order/inputs/order.input';
import { createRandomOrderItemInput } from '../order-item/order-item.fake';

export function createRandomOrderInput(): CreateOrderInput {
  return {
    customer_id: faker.string.uuid(),
    order_date: faker.date.anytime(),
    order_number: faker.number
      .int({
        min: 1,
        max: 100000000,
      })
      .toString(),
    items: [],
  };
}

export function createRandomOrderInputWithItems(
  itemsLength: number = 1,
): CreateOrderInput {
  const items = Array.from({ length: itemsLength }, () =>
    createRandomOrderItemInput(),
  );

  return {
    customer_id: faker.string.uuid(),
    order_date: faker.date.anytime(),
    order_number: faker.string.numeric({
      allowLeadingZeros: true,
      length: {
        min: 1,
        max: 5,
      },
    }),
    items,
  };
}

export function updateRandomOrderInput(): UpdateOrderInput {
  return {
    id: faker.string.uuid(),
    customer_id: faker.string.uuid(),
    order_date: faker.date.anytime(),
    order_number: faker.string.numeric({
      allowLeadingZeros: true,
      length: {
        min: 1,
        max: 5,
      },
    }),
  };
}
