import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GqlExceptionToDataInterceptor } from './interceptors/gql-exception-to-data/gql-exception-to-data.interceptor';
import { I18nInterceptor } from './interceptors/i18n/i18n.interceptor';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/order-item/order-item.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: +configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        entities: [__dirname + '/**/*.entity.js'],
        synchronize: true,
        logging: 'all',
        logger: 'debug',
      }),
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      typesOutputPath: join(__dirname, '../src/generated/i18n.generated.ts'),
      resolvers: [new HeaderResolver(['x-lang'])],
    }),
    CustomerModule,
    ProductModule,
    OrderModule,
    OrderItemModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GqlExceptionToDataInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: I18nInterceptor,
    },
  ],
})
export class AppModule {}
