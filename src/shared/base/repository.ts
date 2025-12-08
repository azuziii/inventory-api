import { InternalServerErrorException, Type } from '@nestjs/common';
import { DatabaseError } from 'pg';
import {
  DeepPartial,
  EntityManager,
  ObjectLiteral,
  QueryFailedError,
  Repository,
} from 'typeorm';

export abstract class BaseRepositoty<
  Entity extends ObjectLiteral,
  CreateDto extends DeepPartial<Entity>,
  UpdateDto extends Partial<Entity>,
> extends Repository<Entity> {
  constructor(
    entity: Type<Entity>,
    protected readonly entityManager: EntityManager,
  ) {
    super(entity, entityManager);
  }

  getManager(externalManagr?: EntityManager): EntityManager {
    return externalManagr || this.entityManager;
  }

  handleDatabaseError(
    error: any,
    entity?: Partial<Entity> | CreateDto | UpdateDto,
  ) {
    if (!(error instanceof QueryFailedError)) throw error;

    if (!(error.driverError instanceof DatabaseError)) {
      console.error('Invalid database driver');
      throw new InternalServerErrorException();
    }

    this.translateDatabaseError(error, entity);
  }

  async insertOne(createDto: CreateDto, entityManager?: EntityManager) {
    const manager = this.getManager(entityManager);

    const newEntity = manager.create(this.target, createDto);

    try {
      const {
        identifiers: [{ id }],
      } = await manager.insert(this.target, newEntity);
      return manager.findOne(this.target, {
        where: {
          id,
        },
      }) as Promise<Entity>;
    } catch (error) {
      throw this.handleDatabaseError(error, createDto);
    }
  }

  async updateOne(
    updateDto: UpdateDto,
    entityManager?: EntityManager,
  ): Promise<Entity> {
    try {
      const manager = this.getManager(entityManager);

      await manager.update(this.target, updateDto.id, updateDto);
      return manager.findOne(this.target, {
        where: { id: updateDto.id },
      }) as Promise<Entity>;
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await this.delete(id);
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  protected abstract translateDatabaseError(
    error: any,
    entity?: Partial<Entity> | CreateDto | UpdateDto,
  ): void;
}
