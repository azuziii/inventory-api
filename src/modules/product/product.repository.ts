import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseRepositoty } from 'src/shared/base/repository';
import { EntityManager } from 'typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { ProductAlreadyExist } from './errors/product.error';

@Injectable()
export class ProductRepository extends BaseRepositoty<Product> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Product, entityManager);
  }

  async insertProduct(
    { customer_id, ...product }: CreateProductDto,
    entityManager?: EntityManager,
  ): Promise<Product> {
    const manager = this.getManager(entityManager);

    const newProduct = manager.create(Product, {
      ...product,
      customer: {
        id: customer_id,
      },
    });

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
    { customer_id, id, ...product }: UpdateProductDto,
    entityManager?: EntityManager,
  ): Promise<Product> {
    try {
      const manager = this.getManager(entityManager);

      const productPayload: Partial<Product> = product;

      if (customer_id) {
        productPayload.customer = {
          id: customer_id,
        } as Customer;
      }

      await manager.update(Product, id, productPayload);
      return manager.findOne(Product, {
        where: { id },
      }) as Promise<Product>;
    } catch (error) {
      throw this.handleDatabaseError(error);
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
