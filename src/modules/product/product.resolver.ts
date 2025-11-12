import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetByIdArgs } from 'src/shared/args/get-by-id/get-by-id.args';
import { ErrorResponseType } from 'src/shared/decorators/meta/error-response-type.decorator';
import { mapToOutput } from 'src/utils/map-to-output.util';
import { CustomerOutput } from '../customer/outputs/customer.output';
import { ProductArguments } from './args/product.args';
import { Product } from './entities/product.entity';
import { CreateProductInput, UpdateProductInput } from './inputs/product.input';
import { ProductList } from './outputs/product-list.output';
import { ProductService } from './product.service';
import { CreateProductResponse } from './responses/create-product.response';
import { DeleteProductResponse } from './responses/delete-product.response';
import { ProductQueryResponse } from './responses/query-product.response';
import { ProductsQueryResponse } from './responses/query-products.response';
import { UpdateProductResponse } from './responses/update-product.response';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @ErrorResponseType(ProductQueryResponse)
  @Query(() => ProductQueryResponse, { name: 'product' })
  async getProduct(@Args() { id }: GetByIdArgs): Promise<ProductQueryResponse> {
    const queryResult = await this.productService.getProductOrFail(id);
    return new ProductQueryResponse(queryResult);
  }

  @ErrorResponseType(ProductsQueryResponse)
  @Query(() => ProductsQueryResponse, { name: 'products' })
  async listProduct(
    @Args()
    args: ProductArguments,
  ): Promise<ProductsQueryResponse> {
    const [products, count] = await this.productService.listProducts(
      args.toManyOptions(),
    );

    const productList = new ProductList(products, {
      ...args,
      total: count,
    });

    return new ProductsQueryResponse(productList);
  }

  @ErrorResponseType(CreateProductResponse)
  @Mutation(() => CreateProductResponse, { name: 'createProduct' })
  async createProduct(
    @Args('input', { type: () => CreateProductInput, nullable: false })
    input: CreateProductInput,
  ): Promise<CreateProductResponse> {
    const createResult = await this.productService.createProduct(input);
    return new CreateProductResponse(createResult);
  }

  @ErrorResponseType(UpdateProductResponse)
  @Mutation(() => UpdateProductResponse, { name: 'updateProduct' })
  async updateProduct(
    @Args('input', { type: () => UpdateProductInput, nullable: false })
    input: UpdateProductInput,
  ): Promise<UpdateProductResponse> {
    const updateResult = await this.productService.updateProduct(input);
    return new UpdateProductResponse(updateResult);
  }

  @ErrorResponseType(DeleteProductResponse)
  @Mutation(() => DeleteProductResponse, { name: 'deleteProduct' })
  async deleteProduct(
    @Args() { id }: GetByIdArgs,
  ): Promise<DeleteProductResponse> {
    const deleteResult = await this.productService.deleteProduct(id);
    return new DeleteProductResponse(deleteResult);
  }

  @ResolveField(() => CustomerOutput)
  async customer(@Parent() product: Product): Promise<CustomerOutput> {
    const customer = await product.customer;
    return mapToOutput(CustomerOutput, customer);
  }
}
