export interface CreateOrderItemDto {
  quantity: number;
  product_id: string;
  order_id?: string;
}

export interface UpdateOrderItemDto extends Partial<CreateOrderItemDto> {
  id: string;
}
