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
import { CustomerAlreadyExist, CustomerNotFound } from './dto/customer.error';
import {
  CreateCustomerResult,
  CustomerQueryResult,
  UpdateCustomerResult,
} from './dto/customer.type';

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
      try {
        const customer = await this.repo.createCustomer(
          customerDto,
          entityManager,
        );

        return customer;
      } catch (error) {
        if (error instanceof CustomerAlreadyExist) {
          return error;
        }
        throw error;
      }
    });
  }

  async updateCustomer(
    customerDto: UpdateCustomerDto,
  ): Promise<typeof UpdateCustomerResult> {
    return this.datasource.transaction(async (entityManager: EntityManager) => {
      try {
        const customer = await entityManager.findOne(Customer, {
          where: { id: customerDto.id },
        });

        if (!customer) {
          return new CustomerNotFound({
            id: customerDto.id,
          });
        }

        const updatedCustomer = await this.repo.updateCustomer(
          customerDto,
          entityManager,
        );
        return updatedCustomer;
      } catch (error) {
        if (
          error instanceof CustomerNotFound ||
          error instanceof CustomerAlreadyExist
        ) {
          return error;
        }

        throw error;
      }
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
      return new CustomerNotFound({
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

  deleteCustomer(id: string): Promise<boolean> {
    return this.repo.deleteCustomer(id);
  }
}
