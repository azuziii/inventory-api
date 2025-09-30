import { EntityManager, QueryFailedError, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { DatabaseError } from 'pg';
import { InternalServerErrorException } from '@nestjs/common';
import { ProductAlreadyExist } from './dto/product.error';

export class ProductRepository extends Repository<Product> {
  constructor(private readonly entityManager: EntityManager) {
    super(Product, entityManager);
  }

  async createProduct(
    entityManager: EntityManager,
    product: CreateProductDto,
  ): Promise<Product> {
    const newProduct = entityManager.create(Product, product);

    try {
      const insertResult = await entityManager.insert(Product, newProduct);
      return entityManager.findOne(Product, {
        where: {
          id: insertResult.identifiers[0].id,
        },
      }) as Promise<Product>;
    } catch (error) {
      throw this.handleDatabaseError(error, product);
    }
  }

  private handleDatabaseError(
    error: any,
    product: CreateProductDto | UpdateProductDto,
  ) {
    if (!(error instanceof QueryFailedError)) throw error;

    if (!(error.driverError instanceof DatabaseError)) {
      console.error('Invalid database driver');
      throw new InternalServerErrorException();
    }

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
