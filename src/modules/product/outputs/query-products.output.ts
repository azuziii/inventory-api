import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto, PaginationProps } from 'src/common/dto/pagination.dto';
import { Product } from '../entities/product.entity';

@ObjectType()
export class ProductList {
  constructor(products: Product[], paginationProps: PaginationProps) {
    this.products = products;
    this.pagination = new PaginationDto(paginationProps);
  }

  @Field(() => [Product!]!)
  products!: Product[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}
