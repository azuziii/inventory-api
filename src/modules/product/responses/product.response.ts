import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto, PaginationProps } from 'src/common/dto/pagination.dto';
import { Product } from '../entities/product.entity';
import { CreateProductResult } from '../results/create-product.result';
import { ProductQueryResult } from '../results/query-product.result';
import { UpdateProductResult } from '../results/update-product.result';
import { DeleteProductResult } from '../results/delete-product.result';

@ObjectType()
export class ProductQueryResponse {
  constructor(queryResult: typeof ProductQueryResult) {
    this.product = queryResult;
  }

  @Field(() => ProductQueryResult)
  product!: typeof ProductQueryResult;
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
  constructor(createResult: typeof CreateProductResult) {
    this.product = createResult;
  }

  @Field(() => CreateProductResult)
  product!: typeof CreateProductResult;
}

@ObjectType()
export class UpdateProductResponse {
  constructor(updateResult: typeof UpdateProductResult) {
    this.product = updateResult;
  }

  @Field(() => UpdateProductResult)
  product!: typeof UpdateProductResult;
}

@ObjectType()
export class DeleteProductResponse {
  constructor(deleteResult: typeof DeleteProductResult) {
    this.product = deleteResult;
  }

  @Field(() => DeleteProductResult)
  product!: typeof DeleteProductResult;
}
