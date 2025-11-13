import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetByIdArgs } from 'src/shared/args/get-by-id/get-by-id.args';
import { AutoMap } from 'src/shared/decorators/meta/auto-map.decorator';
import { ResponseType } from 'src/shared/decorators/meta/error-response-type.decorator';
import { DeleteResponse } from 'src/shared/responses/delete.response';
import { mapToOutput } from 'src/utils/map-to-output.util';
import { CustomerOutput } from '../customer/outputs/customer.output';
import { ProductArguments } from './args/product.args';
import { Product } from './entities/product.entity';
import { CreateProductInput, UpdateProductInput } from './inputs/product.input';
import { ProductList } from './outputs/product-list.output';
import { ProductOutput } from './outputs/product.output';
import { ProductService } from './product.service';
import { CreateProductResponse } from './responses/create-product.response';
import { DeleteProductResponse } from './responses/delete-product.response';
import { ProductQueryResponse } from './responses/query-product.response';
import { ProductsQueryResponse } from './responses/query-products.response';
import { UpdateProductResponse } from './responses/update-product.response';

@Resolver(() => ProductOutput)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @ResponseType(ProductQueryResponse)
  @AutoMap(ProductOutput)
  @Query(() => ProductQueryResponse, { name: 'product' })
  async getProduct(@Args() { id }: GetByIdArgs): Promise<Product> {
    return this.productService.getProductOrFail(id);
  }

  @ResponseType(ProductsQueryResponse)
  @Query(() => ProductsQueryResponse, { name: 'products' })
  async listProduct(
    @Args()
    args: ProductArguments,
  ): Promise<ProductList> {
    const [products, count] = await this.productService.listProducts(
      args.toManyOptions(),
    );

    const productList = new ProductList(mapToOutput(ProductOutput, products), {
      ...args,
      total: count,
    });

    return productList;
  }

  @ResponseType(CreateProductResponse)
  @AutoMap(ProductOutput)
  @Mutation(() => CreateProductResponse, { name: 'createProduct' })
  async createProduct(
    @Args('input', { type: () => CreateProductInput, nullable: false })
    input: CreateProductInput,
  ): Promise<Product> {
    return this.productService.createProduct(input);
  }

  @ResponseType(UpdateProductResponse)
  @AutoMap(ProductOutput)
  @Mutation(() => UpdateProductResponse, { name: 'updateProduct' })
  async updateProduct(
    @Args('input', { type: () => UpdateProductInput, nullable: false })
    input: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.updateProduct(input);
  }

  @ResponseType(DeleteProductResponse)
  @Mutation(() => DeleteProductResponse, { name: 'deleteProduct' })
  async deleteProduct(@Args() { id }: GetByIdArgs): Promise<DeleteResponse> {
    return this.productService.deleteProduct(id);
  }

  @ResolveField(() => CustomerOutput)
  async customer(@Parent() product: Product): Promise<CustomerOutput> {
    const customer = await product.customer;
    return mapToOutput(CustomerOutput, customer);
  }
}
