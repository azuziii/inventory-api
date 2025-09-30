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

  async createCustomer(
    entityManager: EntityManager,
    customer: CreateCustomerDto,
  ): Promise<typeof CreateCustomerResult> {
    const newCustomer = entityManager.create(Customer, customer);

    try {
      const insertResult = await entityManager.insert(Customer, newCustomer);
      return entityManager.findOne(Customer, {
        where: {
          id: insertResult.identifiers[0].id,
        },
      }) as Promise<Customer>;
    } catch (error) {
      return this.handleDatabaseError(error, customer);
    }
  }

  async updateCustomer(
    entityManager: EntityManager,
    customer: UpdateCustomerDto,
  ): Promise<typeof UpdateCustomerResult> {
    try {
      await entityManager.update(Customer, customer.id, customer);
      return entityManager.findOne(Customer, {
        where: { id: customer.id },
      }) as Promise<Customer>;
    } catch (error) {
      return this.handleDatabaseError(error, customer);
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
        return new CustomerAlreadyExist({
          field: 'ice',
        });
      default:
        throw new InternalServerErrorException();
    }
  }
}
