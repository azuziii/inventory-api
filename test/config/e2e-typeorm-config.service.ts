import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class E2ETestConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.getOrThrow('DB_HOST_TEST'),
      port: +this.configService.getOrThrow('DB_PORT_TEST'),
      username: this.configService.getOrThrow('DB_USERNAME_TEST'),
      password: this.configService.getOrThrow('DB_PASSWORD_TEST'),
      database: this.configService.getOrThrow('DB_NAME_TEST'),
      entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, '..', '..', 'migrations', '*{.ts,.js}')],
      synchronize: false,
      migrationsRun: false,
    };
  }
}
