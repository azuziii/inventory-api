import { Injectable } from '@nestjs/common';
import { DeleteResponse } from 'src/common/responses/delete.response';
import {
  DataSource,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomerNotFound } from './errors/customer.error';
import { CreateCustomerUnion } from './unions/create-customer.union';
import { CustomerQueryUnion } from './unions/query-customer.union';
import { UpdateCustomerUnion } from './unions/update-customer.union';

@Injectable()
export class CustomerService {
  constructor(
    private readonly repo: CustomerRepository,
    private readonly datasource: DataSource,
  ) {}

  async createCustomer(
    customerDto: CreateCustomerDto,
  ): Promise<CreateCustomerUnion> {
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
  ): Promise<UpdateCustomerUnion> {
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

  async getCustomerOrFail(id: string): Promise<CustomerQueryUnion> {
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

  async deleteCustomer(id: string): Promise<DeleteResponse> {
    await this.repo.deleteCustomer(id);
    return new DeleteResponse(id);
  }
}
