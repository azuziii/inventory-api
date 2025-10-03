import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { Customer } from '../customer/entities/customer.entity';
import { GetCustomerPipe } from '../customer/pipes/get-customer/get-customer.pipe';
import { UsePipes } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import {
  CreateProductInput,
  ProductArguments,
  UpdateProductInput,
} from './dto/product.input';
import {
  CreateProductResponse,
  ProductQueryResponse,
  ProductsQueryResponse,
  UpdateProductResponse,
} from './responses/product.response';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => ProductQueryResponse, { name: 'productResponse' })
  async getProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ProductQueryResponse> {
    const queryResult = await this.productService.getProductOrFail(id);
    return new ProductQueryResponse(queryResult);
  }

  @Mutation(() => CreateProductResponse, { name: 'createProductResponse' })
  @UsePipes(GetCustomerPipe)
  async createProduct(
    @Args('input', { type: () => CreateProductInput, nullable: false })
    input: CreateProductDto,
  ): Promise<CreateProductResponse> {
    if ('__isError' in input.customer) {
      return {
        product: input.customer,
      };
    }

    const createResult = await this.productService.createProduct(input);
    return new CreateProductResponse(createResult);
  }

  @Mutation(() => UpdateProductResponse, { name: 'updateProductResponse' })
  @UsePipes(GetCustomerPipe)
  async updateProduct(
    @Args('input', { type: () => UpdateProductInput, nullable: false })
    input: UpdateProductDto,
  ): Promise<UpdateProductResponse> {
    if (input.customer && '__isError' in input.customer) {
      return new UpdateProductResponse(input.customer);
    }

    const updateResult = await this.productService.updateProduct(input);
    return new UpdateProductResponse(updateResult);
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

  @ResolveField(() => Customer)
  customer(@Parent() product: Product): Promise<Customer> {
    return product.customer as unknown as Promise<Customer>;
  }
}
