import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto, PaginationProps } from 'src/shared/dto/pagination.dto';
import { Product } from '../entities/product.entity';

@ObjectType()
export class ProductList {
  constructor(products: Product[], paginationProps: PaginationProps) {
    this.items = products;
    this.pagination = new PaginationDto(paginationProps);
  }

  @Field(() => [Product!]!)
  items!: Product[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}
