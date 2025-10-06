import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, FindManyOptions } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { ProductNotFound } from './errors/product.error';
import { ProductRepository } from './product.repository';
import { CreateProductResult } from './results/create-product.result';
import { ProductQueryResult } from './results/query-product.result';
import { UpdateProductResult } from './results/update-product.result';
import { DeleteResponse } from 'src/common/responses/delete.response';

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
      const product = await this.repo.createProduct(productDto, entityManager);

      return product;
    });
  }

  async updateProduct(
    productDto: UpdateProductDto,
  ): Promise<typeof UpdateProductResult> {
    return this.datasource.transaction(async (entityManager: EntityManager) => {
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

  async deleteProduct(id: string): Promise<DeleteResponse> {
    await this.repo.deleteProduct(id);
    return new DeleteResponse(id);
  }
}
