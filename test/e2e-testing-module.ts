import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppModule } from 'src/app.module';

export const createE2ETestingModule = async () => {
  const moduleBuilder = Test.createTestingModule(
    {
      imports: [AppModule],
    },
    {
      moduleIdGeneratorAlgorithm: 'deep-hash',
    },
  );
  moduleBuilder.overrideModule(TypeOrmModule).useModule(
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST_TEST'),
        port: +configService.getOrThrow('DB_PORT_TEST'),
        username: configService.getOrThrow('DB_USERNAME_TEST'),
        password: configService.getOrThrow('DB_PASSWORD_TEST'),
        database: configService.getOrThrow('DB_NAME_TEST'),
        entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
        synchronize: false,
        migrationsRun: false,
      }),
    }),
  );

  return moduleBuilder.compile();
};
