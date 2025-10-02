import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  CreateProductResult,
  ProductQueryResult,
  UpdateProductResult,
} from '../results/product.result';

@ObjectType()
export class ProductQueryResponse {
  @Field(() => ProductQueryResult)
  product!: typeof ProductQueryResult;
}

@ObjectType()
export class ProductsQueryResponse {
  @Field(() => [Product!]!)
  products!: Product[];

  @Field(() => PaginationDto)
  pagination!: PaginationDto;
}

@ObjectType()
export class CreateProductResponse {
  @Field(() => CreateProductResult)
  product!: typeof CreateProductResult;
}

@ObjectType()
export class UpdateProductResponse {
  @Field(() => UpdateProductResult)
  product!: typeof UpdateProductResult;
}
