import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto, PaginationProps } from 'src/common/dto/pagination.dto';
import { Product } from '../entities/product.entity';

@ObjectType()
export class ProductList {
  constructor(products: Product[], paginationProps: PaginationProps) {
    this.response = products;
    this.pagination = new PaginationDto(paginationProps);
  }

  @Field(() => [Product!]!)
  response!: Product[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}
