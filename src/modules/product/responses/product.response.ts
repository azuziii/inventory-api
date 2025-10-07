import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto, PaginationProps } from 'src/common/dto/pagination.dto';
import { Product } from '../entities/product.entity';
import { CreateProductUnion } from '../unions/create-product.union';
import { DeleteProductUnion } from '../unions/delete-product.union';
import { ProductQueryUnion } from '../unions/query-product.union';
import { UpdateProductUnion } from '../unions/update-product.union';

@ObjectType()
export class ProductQueryResponse {
  constructor(queryResult: typeof ProductQueryUnion) {
    this.product = queryResult;
  }

  @Field(() => ProductQueryUnion)
  product!: typeof ProductQueryUnion;
}

@ObjectType()
export class ProductsQueryResponse {
  constructor(products: Product[], paginationProps: PaginationProps) {
    this.products = products;
    this.pagination = new PaginationDto(paginationProps);
  }

  @Field(() => [Product!]!)
  products!: Product[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}

@ObjectType()
export class CreateProductResponse {
  constructor(createResult: typeof CreateProductUnion) {
    this.product = createResult;
  }

  @Field(() => CreateProductUnion)
  product!: typeof CreateProductUnion;
}

@ObjectType()
export class UpdateProductResponse {
  constructor(updateResult: typeof UpdateProductUnion) {
    this.product = updateResult;
  }

  @Field(() => UpdateProductUnion)
  product!: typeof UpdateProductUnion;
}

@ObjectType()
export class DeleteProductResponse {
  constructor(deleteResult: typeof DeleteProductUnion) {
    this.product = deleteResult;
  }

  @Field(() => DeleteProductUnion)
  product!: typeof DeleteProductUnion;
}
