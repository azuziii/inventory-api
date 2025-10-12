import { Customer } from 'src/modules/customer/entities/customer.entity';

export interface CreateOrderDto {
  order_number: number;
  order_date: Date;
  customer: Customer;
}

export interface UpdateOrderDto extends Partial<CreateOrderDto> {
  id: string;
}
