import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseError } from 'pg';
import { BaseRepositoty } from 'src/shared/base/repository';
import { EntityManager, QueryFailedError } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomerAlreadyExist, CustomerInUse } from './errors/customer.error';

@Injectable()
export class CustomerRepository extends BaseRepositoty<Customer> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Customer, entityManager);
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

  async deleteCustomer(id: string): Promise<void> {
    try {
      const deleteResult = await this.delete(id);
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  private handleDatabaseError(
    error: any,
    customer?: CreateCustomerDto | UpdateCustomerDto,
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
      case 'FK_product_customer':
        throw new CustomerInUse({
          resourceName: 'Product',
        });
      default:
        throw new InternalServerErrorException();
    }
  }
}
