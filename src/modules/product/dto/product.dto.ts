import { NotFound } from 'src/common/errors/not-found.error';
import { Customer } from 'src/modules/customer/entities/customer.entity';

export interface CreateProductDto {
  name: string;
  code: string;
  price: number;
  isSample: boolean;
  customer: Customer | NotFound;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  id: string;
}
