import { Customer } from 'src/modules/customer/entities/customer.entity';
import { CustomerNotFound } from 'src/modules/customer/errors/customer.error';

export interface CreateProductDto {
  name: string;
  code: string;
  price: number;
  isSample: boolean;
  customer: Customer | CustomerNotFound;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  id: string;
}
