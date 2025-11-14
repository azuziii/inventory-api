import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST_TEST,
  port: +process.env.DB_PORT_TEST!,
  username: process.env.DB_USERNAME_TEST,
  password: process.env.DB_PASSWORD_TEST,
  database: process.env.DB_NAME_TEST,
  entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', '..', 'migrations', '*{.ts,.js}')],
  synchronize: false,
  migrationsRun: false,
});
