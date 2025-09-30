import { Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}
}
