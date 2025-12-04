import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.getOrThrow('DB_HOST'),
      port: +this.configService.getOrThrow('DB_PORT'),
      username: this.configService.getOrThrow('DB_USERNAME'),
      password: this.configService.getOrThrow('DB_PASSWORD'),
      database: this.configService.getOrThrow('DB_NAME'),
      entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, '..', '..', 'migrations', '*{.ts,.js}')],
      synchronize: false,
      migrationsRun: false,
    };
  }
}
