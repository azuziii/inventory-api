import { CreateOrderItemDto } from 'src/modules/order-item/dto/order-item.dto';

export interface CreateOrderDto {
  order_number: number;
  order_date: Date;
  customer_id: string;
  items: CreateOrderItemDto[];
}

export interface UpdateOrderDto extends Partial<Omit<CreateOrderDto, 'items'>> {
  id: string;
}
