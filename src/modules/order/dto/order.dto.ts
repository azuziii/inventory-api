import { Customer } from 'src/modules/customer/entities/customer.entity';
import { CreateOrderItemDto } from 'src/modules/order-item/dto/order-item.dto';

export interface CreateOrderDto {
  order_number: number;
  order_date: Date;
  customer: Customer;
  items: CreateOrderItemDto[];
}

export interface UpdateOrderDto extends Partial<CreateOrderDto> {
  id: string;
}
