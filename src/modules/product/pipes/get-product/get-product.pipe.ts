import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ProductNotFound } from '../../errors/product.error';
import { IProduct } from '../../interfaces/product.interface';

@Injectable()
export class GetProductPipe implements PipeTransform {
  constructor(@Inject(IProduct) private readonly productService: IProduct) {}

  async transform(
    { product_id, ...value }: { product_id?: string },
    metadata: ArgumentMetadata,
  ) {
    if (!product_id || typeof product_id != 'string') return value;

    const product = await this.productService.getProduct({
      where: {
        id: product_id,
      },
    });

    if (!product) {
      throw new ProductNotFound({ id: product_id });
    }

    return {
      ...value,
      product,
    };
  }
}
