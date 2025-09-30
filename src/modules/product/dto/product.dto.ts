import { Customer } from 'src/modules/customer/entities/customer.entity';

export interface CreateProductDto {
  name: string;
  code: string;
  price: number;
  isSample: boolean;
  customer: Customer;
}
