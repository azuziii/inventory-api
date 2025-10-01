import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { DataSource, EntityManager, FindManyOptions } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductAlreadyExist, ProductNotFound } from './errors/product.error';
import { Product } from './entities/product.entity';
import {
  CreateProductResult,
  ProductQueryResult,
  UpdateProductResult,
} from './results/product.result';

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

  async updateProduct(
    productDto: UpdateProductDto,
  ): Promise<typeof UpdateProductResult> {
    return this.datasource.transaction(async (entityManager: EntityManager) => {
      try {
        const product = await entityManager.findOne(Product, {
          where: { id: productDto.id },
        });

        if (!product) {
          return new ProductNotFound({
            id: productDto.id,
          });
        }

        const updatedProduct = await this.repo.updateProduct(
          productDto,
          entityManager,
        );
        return updatedProduct;
      } catch (error) {
        console.log(error);
        if (
          error instanceof ProductNotFound ||
          error instanceof ProductAlreadyExist
        ) {
          return error;
        }

        throw error;
      }
    });
  }

  async getProductOrFail(id: string): Promise<typeof ProductQueryResult> {
    const product = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      return new ProductNotFound({
        id,
      });
    }

    return product;
  }

  listProducts(
    options: FindManyOptions<Product>,
  ): Promise<[Product[], number]> {
    return this.repo.findAndCount(options);
  }

  deleteProduct(id: string): Promise<boolean> {
    return this.repo.deleteProduct(id);
  }
}
