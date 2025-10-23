import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSubscriber } from './entities/product.subscriber';
import { IProduct } from './interfaces/product.interface';
import { ProductRepository } from './product.repository';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductResolver,
    ProductService,
    ProductRepository,
    ProductSubscriber,
    {
      provide: IProduct,
      useExisting: ProductService,
    },
  ],
  exports: [IProduct],
})
export class ProductModule {}
