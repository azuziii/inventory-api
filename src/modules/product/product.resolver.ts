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
import {
  CreateProductResponse,
  ProductQueryResponse,
} from './dto/product.type';
import { Customer } from '../customer/entities/customer.entity';
import { GetCustomerPipe } from '../customer/pipes/get-customer/get-customer.pipe';
import { UsePipes } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { CreateProductInput } from './dto/product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => ProductQueryResponse, { name: 'productResponse' })
  async getProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ProductQueryResponse> {
    const product = await this.productService.getProductOrFail(id);

    return {
      product,
    };
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

    const product = await this.productService.createProduct(input);

    return {
      product,
    };
  }

  @ResolveField(() => Customer)
  customer(@Parent() product: Product): Promise<Customer> {
    return product.customer as unknown as Promise<Customer>;
  }
}
