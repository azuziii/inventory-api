import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { DataSource, EntityManager } from 'typeorm';
import { CreateProductDto } from './dto/product.dto';
import { CreateProductResult } from './dto/product.type';
import { ProductAlreadyExist } from './dto/product.error';

@Injectable()
export class ProductService {
  constructor(
    private readonly repo: ProductRepository,
    private readonly datasource: DataSource,
  ) {}

  async createProduct(
    productDto: CreateProductDto,
  ): Promise<typeof CreateProductResult> {
    return this.datasource.transaction(async (entityManager: EntityManager) => {
      try {
        const product = await this.repo.createProduct(
          productDto,
          entityManager,
        );

        return product;
      } catch (error) {
        if (error instanceof ProductAlreadyExist) {
          return error;
        }
        throw error;
      }
    });
  }
}
