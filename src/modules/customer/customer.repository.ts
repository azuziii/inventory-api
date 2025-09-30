import { EntityManager, QueryFailedError, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseError } from 'pg';
import { CustomerAlreadyExist } from './dto/customer.error';
import {
  CreateCustomerResult,
  UpdateCustomerResult,
} from './dto/customer.type';

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(private readonly entityManager: EntityManager) {
    super(Customer, entityManager);
  }

  private getManager(externalManagr?: EntityManager): EntityManager {
    return externalManagr || this.entityManager;
  }

  async createCustomer(
    customer: CreateCustomerDto,
    entityManager?: EntityManager,
  ): Promise<Customer> {
    const manager = this.getManager(entityManager);

    const newCustomer = manager.create(Customer, customer);

    try {
      const insertResult = await manager.insert(Customer, newCustomer);
      return manager.findOne(Customer, {
        where: {
          id: insertResult.identifiers[0].id,
        },
      }) as Promise<Customer>;
    } catch (error) {
      throw this.handleDatabaseError(error, customer);
    }
  }

  async updateCustomer(
    customer: UpdateCustomerDto,
    entityManager?: EntityManager,
  ): Promise<Customer> {
    try {
      const manager = this.getManager(entityManager);
      await manager.update(Customer, customer.id, customer);
      return manager.findOne(Customer, {
        where: { id: customer.id },
      }) as Promise<Customer>;
    } catch (error) {
      throw this.handleDatabaseError(error, customer);
    }
  }

  async deleteCustomer(id: string): Promise<boolean> {
    const deleteResult = await this.delete(id);

    if (typeof deleteResult.affected != 'number') {
      return false;
    }

    return true;
  }

  private handleDatabaseError(
    error: any,
    customer: CreateCustomerDto | UpdateCustomerDto,
  ) {
    if (!(error instanceof QueryFailedError)) throw error;

    if (!(error.driverError instanceof DatabaseError)) {
      console.error('Invalid database driver');
      throw new InternalServerErrorException();
    }

    switch (error.driverError.constraint) {
      case 'UQ_customer_ice':
        throw new CustomerAlreadyExist({
          field: 'ice',
        });
      default:
        throw new InternalServerErrorException();
    }
  }
}
