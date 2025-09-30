import { FindOneOptions } from 'typeorm';
import { Customer } from '../entities/customer.entity';

export const ICustomer = 'ICustomer';

export interface ICustomer {
  getCustomer(options: FindOneOptions<Customer>): Promise<Customer | null>;
}
