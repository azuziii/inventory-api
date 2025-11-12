import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto, PaginationProps } from 'src/shared/dto/pagination.dto';
import { ProductOutput } from './product.output';

@ObjectType()
export class ProductList {
  constructor(products: ProductOutput[], paginationProps: PaginationProps) {
    this.items = products;
    this.pagination = new PaginationDto(paginationProps);
  }

  @Field(() => [ProductOutput!]!)
  items!: ProductOutput[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}
