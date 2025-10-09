import { EntityManager, ObjectLiteral, Repository } from 'typeorm';

export abstract class BaseRepositoty<
  Entity extends ObjectLiteral,
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
}
