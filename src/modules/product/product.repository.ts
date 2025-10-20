import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseRepositoty } from 'src/shared/base/repository';
import { EntityManager } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { ProductAlreadyExist } from './errors/product.error';

@Injectable()
export class ProductRepository extends BaseRepositoty<Product> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Product, entityManager);
  }

  async insertProduct(
    product: CreateProductDto,
    entityManager?: EntityManager,
  ): Promise<Product> {
    const manager = this.getManager(entityManager);

    const newProduct = manager.create(Product, product);

    try {
      const insertResult = await manager.insert(Product, newProduct);
      return manager.findOne(Product, {
        where: {
          id: insertResult.identifiers[0].id,
        },
      }) as Promise<Product>;
    } catch (error) {
      throw this.handleDatabaseError(error, product);
    }
  }

  async updateProduct(
    product: UpdateProductDto,
    entityManager?: EntityManager,
  ): Promise<Product> {
    try {
      const manager = this.getManager(entityManager);

      await manager.update(Product, product.id, product);
      return manager.findOne(Product, {
        where: { id: product.id },
      }) as Promise<Product>;
    } catch (error) {
      throw this.handleDatabaseError(error, product);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const deleteResult = await this.delete(id);
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  protected translateDatabaseError(
    error: any,
    entity?: Partial<Product> | undefined,
  ): void {
    switch (error.driverError.constraint) {
      case 'UQ_product_customer_name':
        throw new ProductAlreadyExist({
          field: 'name',
        });
      default:
        throw new InternalServerErrorException();
    }
  }
}
