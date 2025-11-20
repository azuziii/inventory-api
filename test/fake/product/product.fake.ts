import { faker } from '@faker-js/faker';
import {
  CreateProductInput,
  UpdateProductInput,
} from 'src/modules/product/inputs/product.input';

export function createRandomProductInput(): CreateProductInput {
  return {
    name: faker.company.name(),
    code: faker.string.uuid(),
    customer_id: faker.string.uuid(),
    isSample: faker.datatype.boolean(),
    price: faker.number.float({ min: 0, fractionDigits: 2 }),
  };
}

export function createRandomProductUpdate(): UpdateProductInput {
  const data = createRandomProductInput();
  return {
    id: faker.string.uuid(),
    ...data,
  };
}
