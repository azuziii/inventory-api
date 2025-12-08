import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseRepositoty } from 'src/shared/base/repository';
import { CustomerNotFound } from 'src/shared/domain-errors';
import { EntityManager } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { ProductAlreadyExist, ProductInUse } from './errors/product.error';

@Injectable()
export class ProductRepository extends BaseRepositoty<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Product, entityManager);
  }

  insertProduct(
    product: CreateProductDto,
    entityManager?: EntityManager,
  ): Promise<Product> {
    return this.insertOne(product, entityManager);
  }

  updateProduct(
    product: UpdateProductDto,
    entityManager?: EntityManager,
  ): Promise<Product> {
    return this.updateOne(product, entityManager);
  }

  deleteProduct(id: string): Promise<void> {
    return this.deleteOne(id);
  }

  protected translateDatabaseError(
    error: any,
    entity?: CreateProductDto | UpdateProductDto | Partial<Product>,
  ): void {
    switch (error.driverError.constraint) {
      case 'UQ_product_customer_name':
        throw new ProductAlreadyExist({
          field: 'name',
        });
      case 'FK_PRODUCT_ORDER_ITEM':
        throw new ProductInUse({
          resourceName: 'order-item',
        });
      case 'FK_product_customer':
        throw new CustomerNotFound({
          id: entity?.customer_id,
        });
      default:
        throw new InternalServerErrorException();
    }
  }
}
