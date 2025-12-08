import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseRepositoty } from 'src/shared/base/repository';
import { EntityManager } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomerAlreadyExist, CustomerInUse } from './errors/customer.error';

@Injectable()
export class CustomerRepository extends BaseRepositoty<
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto
> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Customer, entityManager);
  }

  insertCustomer(
    customer: CreateCustomerDto,
    entityManager?: EntityManager,
  ): Promise<Customer> {
    return this.insertOne(customer, entityManager);
  }

  updateCustomer(
    customer: UpdateCustomerDto,
    entityManager?: EntityManager,
  ): Promise<Customer> {
    return this.updateOne(customer, entityManager);
  }

  deleteCustomer(id: string): Promise<void> {
    return this.deleteOne(id);
  }

  protected translateDatabaseError(
    error: any,
    entity?: CreateCustomerDto | UpdateCustomerDto | Partial<Customer>,
  ): void {
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
