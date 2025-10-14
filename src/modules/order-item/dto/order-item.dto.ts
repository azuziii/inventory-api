import { Product } from 'src/modules/product/entities/product.entity';

export interface CreateOrderItemDto {
  product: Product;
  quantity: number;
}

export interface UpdateOrderItemDto extends Partial<CreateOrderItemDto> {
  id: string;
}
