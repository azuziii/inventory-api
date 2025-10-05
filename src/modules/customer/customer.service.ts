import { Injectable } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Customer } from './entities/customer.entity';
import {
  CustomerAlreadyExist,
  CustomerNotFound,
} from './errors/customer.error';
import { InUse } from 'src/common/errors/in-use.error';
import { DeleteResponse } from 'src/common/responses/delete.response';
import { CreateCustomerResult } from './results/create-customer.result';
import { CustomerQueryResult } from './results/query-customer.result';
import { DeleteCustomerResult } from './results/delete-customer.result';
import { UpdateCustomerResult } from './results/update-customer.result';

@Injectable()
export class CustomerService {
  constructor(
    private readonly repo: CustomerRepository,
    private readonly datasource: DataSource,
  ) {}

  async createCustomer(
    customerDto: CreateCustomerDto,
  ): Promise<typeof CreateCustomerResult> {
    return this.datasource.transaction(async (entityManager: EntityManager) => {
      const customer = await this.repo.createCustomer(
        customerDto,
        entityManager,
      );

      return customer;
    });
  }

  async updateCustomer(
    customerDto: UpdateCustomerDto,
  ): Promise<typeof UpdateCustomerResult> {
    return this.datasource.transaction(async (entityManager: EntityManager) => {
      const customer = await entityManager.findOne(Customer, {
        where: { id: customerDto.id },
      });

      if (!customer) {
        throw new CustomerNotFound({
          id: customerDto.id,
        });
      }

      const updatedCustomer = await this.repo.updateCustomer(
        customerDto,
        entityManager,
      );
      return updatedCustomer;
    });
  }

  getCustomer(options: FindOneOptions<Customer>): Promise<Customer | null> {
    return this.repo.findOne(options);
  }

  async getCustomerOrFail(id: string): Promise<typeof CustomerQueryResult> {
    const customer = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!customer) {
      throw new CustomerNotFound({
        id,
      });
    }

    return customer;
  }

  listCustomers(
    options: FindManyOptions<Customer>,
  ): Promise<[Customer[], number]> {
    return this.repo.findAndCount(options);
  }

  async deleteCustomer(id: string): Promise<typeof DeleteCustomerResult> {
    await this.repo.deleteCustomer(id);
    return new DeleteResponse(id);
  }
}
