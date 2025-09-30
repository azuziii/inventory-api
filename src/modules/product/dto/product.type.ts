import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { NotFound } from 'src/common/errors/not-found.error';
import { AlreadyExist } from 'src/common/errors/alread-exist.error';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export const ProductQueryResult = createUnionType({
  name: 'ProductQueryResult',
  types: () => [Product, NotFound],
});

export const CreateProductResult = createUnionType({
  name: 'CreateProductResult',
  types: () => [Product, AlreadyExist],
});

export const UpdateProductResult = createUnionType({
  name: 'UpdateProductResult',
  types: () => [Product, NotFound, AlreadyExist],
});

@ObjectType()
export class ProductQueryResponse {
  @Field(() => ProductQueryResult)
  Product: typeof ProductQueryResult;
}

@ObjectType()
export class ProductsQueryResponse {
  @Field(() => [Product!]!)
  Products: Product[];

  @Field(() => PaginationDto)
  pagination: PaginationDto;
}

@ObjectType()
export class CreateProductResponse {
  @Field(() => CreateProductResult)
  Product: typeof CreateProductResult;
}

@ObjectType()
export class UpdateProductResponse {
  @Field(() => UpdateProductResult)
  Product: typeof UpdateProductResult;
}
