import { InternalServerErrorException } from '@nestjs/common';
import { DatabaseError } from 'pg';
import {
  EntityManager,
  ObjectLiteral,
  QueryFailedError,
  Repository,
} from 'typeorm';

export abstract class BaseRepositoty<
  Entity extends ObjectLiteral,
  DtoUnion,
> extends Repository<Entity> {
  constructor(
    entity: new () => Entity,
    protected readonly entityManager: EntityManager,
  ) {
    super(entity, entityManager);
  }

  getManager(externalManagr?: EntityManager): EntityManager {
    return externalManagr || this.entityManager;
  }

  handleDatabaseError(error: any, entity?: Partial<Entity> | DtoUnion) {
    if (!(error instanceof QueryFailedError)) throw error;

    if (!(error.driverError instanceof DatabaseError)) {
      console.error('Invalid database driver');
      throw new InternalServerErrorException();
    }

    this.translateDatabaseError(error, entity);
  }

  protected abstract translateDatabaseError(
    error: any,
    entity?: Partial<Entity> | DtoUnion,
  ): void;
}
