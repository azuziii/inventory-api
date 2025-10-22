export interface CreateProductDto {
  name: string;
  code: string;
  price: number;
  isSample: boolean;
  customer_id: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  id: string;
}
