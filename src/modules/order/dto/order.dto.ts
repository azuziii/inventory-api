export interface CreateOrderDto {
  order_number: number;
  order_date: Date;
  customer_id: string;
}

export interface UpdateOrderDto extends Partial<CreateOrderDto> {
  id: string;
}
