import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import {
  CreateCustomerInput,
  CustomerArguments,
  UpdateCustomerInput,
} from './dto/customer.input';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  CreateCustomerResponse,
  CustomerQueryResponse,
  CustomersQueryResponse,
  UpdateCustomerResponse,
} from './responses/customer.response';
import { DeleteCustomerResult } from './results/customer.result';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => CustomerQueryResponse, { name: 'customerResponse' })
  async getCustomer(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<CustomerQueryResponse> {
    const customer = await this.customerService.getCustomerOrFail(id);

    return {
      customer,
    };
  }

  @Query(() => CustomersQueryResponse, { name: 'customersResponse' })
  async listCustomer(
    @Args()
    args: CustomerArguments,
  ): Promise<CustomersQueryResponse> {
    const [customers, count] = await this.customerService.listCustomers(
      args.toManyOptions(),
    );

    return {
      customers,
      pagination: new PaginationDto({
        ...args,
        total: count,
      }),
    };
  }

  @Mutation(() => CreateCustomerResponse, { name: 'createCustomerResponse' })
  async createCustomer(
    @Args('input', { type: () => CreateCustomerInput, nullable: false })
    input: CreateCustomerInput,
  ): Promise<CreateCustomerResponse> {
    const customer = await this.customerService.createCustomer(input);

    return {
      customer,
    };
  }

  @Mutation(() => UpdateCustomerResponse, { name: 'updateCustomerResponse' })
  async updateCustomer(
    @Args('input', { type: () => UpdateCustomerInput, nullable: false })
    input: UpdateCustomerInput,
  ): Promise<UpdateCustomerResponse> {
    const customer = await this.customerService.updateCustomer(input);

    return {
      customer,
    };
  }

  @Mutation(() => DeleteCustomerResult)
  deleteCustomer(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof DeleteCustomerResult> {
    return this.customerService.deleteCustomer(id);
  }
}
