import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { join } from 'path';
import { AutoMapInterceptor } from 'src/interceptors/auto-map/auto-map.interceptor';
import { GqlResponseWrapperInterceptor } from 'src/interceptors/gql-exception-to-data/gql-response-wrapper.interceptor';
import { I18nInterceptor } from 'src/interceptors/i18n/i18n.interceptor';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { OrderItemModule } from 'src/modules/order-item/order-item.module';
import { OrderModule } from 'src/modules/order/order.module';
import { ProductModule } from 'src/modules/product/product.module';

export const createE2ETestingModule = async () => {
  const moduleBuilder = Test.createTestingModule(
    {
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
            host: configService.getOrThrow('DB_HOST_TEST'),
            port: +configService.getOrThrow('DB_PORT_TEST'),
            username: configService.getOrThrow('DB_USERNAME_TEST'),
            password: configService.getOrThrow('DB_PASSWORD_TEST'),
            database: configService.getOrThrow('DB_NAME_TEST'),
            entities: [join(__dirname, '../src/**/*.entity.ts')],
            synchronize: false,
            migrations: ['migrations/*.ts'],
            migrationsRun: true,
            logging: 'all',
            logger: 'advanced-console',
          }),
        }),
        I18nModule.forRoot({
          fallbackLanguage: 'en',
          loaderOptions: {
            path: join(__dirname, '../src/i18n/'),
            watch: true,
          },
          typesOutputPath: join(
            __dirname,
            '../src/generated/i18n.generated.ts',
          ),
          resolvers: [new HeaderResolver(['x-lang'])],
        }),
        EventEmitterModule.forRoot({
          verboseMemoryLeak: true,
        }),
        CustomerModule,
        ProductModule,
        OrderModule,
        OrderItemModule,
      ],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: GqlResponseWrapperInterceptor,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: AutoMapInterceptor,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: I18nInterceptor,
        },
      ],
    },
    {
      moduleIdGeneratorAlgorithm: 'deep-hash',
    },
  );

  return moduleBuilder.compile();
};
