import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { I18nValidationPipe } from 'nestjs-i18n';
import { DataSource } from 'typeorm';
import { createE2ETestingModule } from './e2e-testing-module';

export async function clearDB(app: INestApplication) {
  const dataSource = app.get(DataSource);
  if (!dataSource) {
    throw new Error(
      'Failed to retrieve TypeORM DataSource from NestJS application.',
    );
  }

  const entities = dataSource.entityMetadatas;
  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    await repository.query(
      `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`,
    );
  }
}

export async function initializeTestEnvironment(): Promise<
  [INestApplication, TestingModule]
> {
  try {
    const module = await createE2ETestingModule();
    const app = module.createNestApplication();

    app.useGlobalPipes(
      new I18nValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    await app.init();

    return [app, module];
  } catch (error) {
    console.error('Failed to initialize test enviroment:', error);
    process.exit(1);
  }
}

export async function cleanupTestEnvironment(
  module: TestingModule,
  app: INestApplication,
) {
  try {
    if (app) {
      await clearDB(app);
      await app.close();
    }
    if (module) await module.close();
  } catch (error) {
    console.error('Failed to cleanup testi enviroment:', error);
    process.exit(1);
  }
}
