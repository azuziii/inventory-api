import { Injectable } from '@nestjs/common';
import { DeleteResponse } from 'src/common/responses/delete.response';
import { DataSource, EntityManager, FindManyOptions } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { ProductNotFound } from './errors/product.error';
import { ProductRepository } from './product.repository';
import { CreateProductUnion } from './unions/create-product.union';
import { ProductQueryUnion } from './unions/query-product.union';
import { UpdateProductUnion } from './unions/update-product.union';

@Injectable()
export class ProductService {
  constructor(
    private readonly repo: ProductRepository,
    private readonly datasource: DataSource,
  ) {}

  async createProduct(
    productDto: CreateProductDto,
  ): Promise<CreateProductUnion> {
    return this.datasource.transaction(async (entityManager: EntityManager) => {
      const product = await this.repo.createProduct(productDto, entityManager);

      return product;
    });
  }

  async updateProduct(
    productDto: UpdateProductDto,
  ): Promise<UpdateProductUnion> {
    return this.datasource.transaction(async (entityManager: EntityManager) => {
      const product = await entityManager.findOne(Product, {
        where: { id: productDto.id },
      });

      if (!product) {
        throw new ProductNotFound({
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

  async getProductOrFail(id: string): Promise<ProductQueryUnion> {
    const product = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new ProductNotFound({
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
