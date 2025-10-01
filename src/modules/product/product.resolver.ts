import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ProductQueryResponse } from './dto/product.type';
import { Customer } from '../customer/entities/customer.entity';

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

  @ResolveField(() => Customer)
  customer(@Parent() product: Product): Promise<Customer> {
    return product.customer as unknown as Promise<Customer>;
  }
}
