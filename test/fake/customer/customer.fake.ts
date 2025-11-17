import { faker } from '@faker-js/faker';
import {
  CreateCustomerInput,
  UpdateCustomerInput,
} from 'src/modules/customer/inputs/customer.input';

export function createRandomCustomerInput(): CreateCustomerInput {
  return {
    name: faker.company.name(),
    ice: faker.string.numeric(15),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    country: faker.location.country(),
    contact_email: faker.internet.email(),
    contact_name: faker.person.fullName(),
    contact_phone: faker.phone.number(),
  };
}

export function createRandomCustomerUpdate(): UpdateCustomerInput {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    ice: faker.string.numeric(15),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    country: faker.location.country(),
    contact_email: faker.internet.email(),
    contact_name: faker.person.fullName(),
    contact_phone: faker.phone.number(),
  };
}
