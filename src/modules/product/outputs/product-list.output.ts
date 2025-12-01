import { Field, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from 'src/shared/base/output';
import { PaginationDto, PaginationProps } from 'src/shared/dto/pagination.dto';
import { ProductOutput } from './product.output';

@ObjectType()
export class ProductList extends BaseOutput {
  constructor(products: ProductOutput[], paginationProps: PaginationProps) {
    super();
    this.items = products;
    this.pagination = new PaginationDto(paginationProps);
  }

  @Field(() => [ProductOutput!]!)
  items!: ProductOutput[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}
