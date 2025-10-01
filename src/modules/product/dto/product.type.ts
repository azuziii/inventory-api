import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { NotFound } from 'src/common/errors/not-found.error';
import { AlreadyExist } from 'src/common/errors/alread-exist.error';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CustomerNotFound } from 'src/modules/customer/errors/customer.error';

export const ProductQueryResult = createUnionType({
  name: 'ProductQueryResult',
  types: () => [Product, NotFound],
});

export const CreateProductResult = createUnionType({
  name: 'CreateProductResult',
  types: () => [Product, AlreadyExist, CustomerNotFound],
});

export const UpdateProductResult = createUnionType({
  name: 'UpdateProductResult',
  types: () => [Product, NotFound, AlreadyExist],
});

@ObjectType()
export class ProductQueryResponse {
  @Field(() => ProductQueryResult)
  product: typeof ProductQueryResult;
}

@ObjectType()
export class ProductsQueryResponse {
  @Field(() => [Product!]!)
  products: Product[];

  @Field(() => PaginationDto)
  pagination: PaginationDto;
}

@ObjectType()
export class CreateProductResponse {
  @Field(() => CreateProductResult)
  product: typeof CreateProductResult;
}

@ObjectType()
export class UpdateProductResponse {
  @Field(() => UpdateProductResult)
  product: typeof UpdateProductResult;
}
