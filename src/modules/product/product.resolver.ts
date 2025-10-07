import { UsePipes } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetByIdArgs } from 'src/common/args/get-by-id.args';
import { ErrorResponseType } from 'src/common/decorators/meta/error-response-type.decorator';
import { Customer } from '../customer/entities/customer.entity';
import { GetCustomerPipe } from '../customer/pipes/get-customer/get-customer.pipe';
import { ProductArguments } from './args/product.args';
import { Product } from './entities/product.entity';
import { CreateProductInput, UpdateProductInput } from './inputs/product.input';
import { ProductService } from './product.service';
import {
  CreateProductResponse,
  DeleteProductResponse,
  ProductQueryResponse,
  ProductsQueryResponse,
  UpdateProductResponse,
} from './responses/product.response';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @ErrorResponseType(ProductQueryResponse)
  @Query(() => ProductQueryResponse, { name: 'productResponse' })
  async getProduct(@Args() { id }: GetByIdArgs): Promise<ProductQueryResponse> {
    const queryResult = await this.productService.getProductOrFail(id);
    return new ProductQueryResponse(queryResult);
  }

  @Query(() => ProductsQueryResponse, { name: 'productsResponse' })
  async listProduct(
    @Args()
    args: ProductArguments,
  ): Promise<ProductsQueryResponse> {
    const [products, count] = await this.productService.listProducts(
      args.toManyOptions(),
    );

    return new ProductsQueryResponse(products, {
      ...args,
      total: count,
    });
  }

  @ErrorResponseType(CreateProductResponse)
  @Mutation(() => CreateProductResponse, { name: 'createProductResponse' })
  @UsePipes(GetCustomerPipe)
  async createProduct(
    @Args('input', { type: () => CreateProductInput, nullable: false })
    input: CreateProductInput,
  ): Promise<CreateProductResponse> {
    const createResult = await this.productService.createProduct(input);
    return new CreateProductResponse(createResult);
  }

  @ErrorResponseType(UpdateProductResponse)
  @Mutation(() => UpdateProductResponse, { name: 'updateProductResponse' })
  @UsePipes(GetCustomerPipe)
  async updateProduct(
    @Args('input', { type: () => UpdateProductInput, nullable: false })
    input: UpdateProductInput,
  ): Promise<UpdateProductResponse> {
    const updateResult = await this.productService.updateProduct(input);
    return new UpdateProductResponse(updateResult);
  }

  @ErrorResponseType(DeleteProductResponse)
  @Mutation(() => DeleteProductResponse, { name: 'deleteProductResponse' })
  async deleteProduct(
    @Args() { id }: GetByIdArgs,
  ): Promise<DeleteProductResponse> {
    const deleteResult = await this.productService.deleteProduct(id);
    return new DeleteProductResponse(deleteResult);
  }

  @ResolveField(() => Customer)
  customer(@Parent() product: Product): Promise<Customer> {
    return product.customer as unknown as Promise<Customer>;
  }
}
