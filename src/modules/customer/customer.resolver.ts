import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetByIdArgs } from 'src/shared/args/get-by-id/get-by-id.args';
import { AutoMap } from 'src/shared/decorators/meta/auto-map.decorator';
import { ResponseType } from 'src/shared/decorators/meta/error-response-type.decorator';
import { DeleteResponse } from 'src/shared/responses/delete.response';
import { mapToOutput } from 'src/utils/map-to-output.util';
import { CustomerArguments } from './args/customer.args';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import {
  CreateCustomerInput,
  UpdateCustomerInput,
} from './inputs/customer.input';
import { CustomerList } from './outputs/customer-list.output';
import { CustomerOutput } from './outputs/customer.output';
import { CreateCustomerResponse } from './responses/create-customer.response';
import { DeleteCustomerResponse } from './responses/delete-customer.response';
import { CustomerQueryResponse } from './responses/query-customer.response';
import { CustomersQueryResponse } from './responses/query-customers.response';
import { UpdateCustomerResponse } from './responses/update-customer.response';

@Resolver(() => CustomerOutput)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @ResponseType(CustomerQueryResponse)
  @AutoMap(CustomerOutput)
  @Query(() => CustomerQueryResponse, { name: 'customer' })
  async getCustomer(@Args() { id }: GetByIdArgs): Promise<Customer> {
    return this.customerService.getCustomerOrFail(id);
  }

  @ResponseType(CustomersQueryResponse)
  @Query(() => CustomersQueryResponse, { name: 'customers' })
  async listCustomer(
    @Args()
    args: CustomerArguments,
  ): Promise<CustomerList> {
    const [customers, count] = await this.customerService.listCustomers(
      args.toManyOptions(),
    );
    const customerList = new CustomerList(
      mapToOutput(CustomerOutput, customers),
      {
        ...args,
        total: count,
      },
    );

    return customerList;
  }

  @ResponseType(CreateCustomerResponse)
  @AutoMap(CustomerOutput)
  @Mutation(() => CreateCustomerResponse, { name: 'createCustomer' })
  async createCustomer(
    @Args('input', { type: () => CreateCustomerInput, nullable: false })
    input: CreateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.createCustomer(input);
  }

  @ResponseType(UpdateCustomerResponse)
  @AutoMap(CustomerOutput)
  @Mutation(() => UpdateCustomerResponse, { name: 'updateCustomer' })
  async updateCustomer(
    @Args('input', { type: () => UpdateCustomerInput, nullable: false })
    input: UpdateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.updateCustomer(input);
  }

  @ResponseType(DeleteCustomerResponse)
  @Mutation(() => DeleteCustomerResponse, { name: 'deleteCustomer' })
  async deleteCustomer(@Args() { id }: GetByIdArgs): Promise<DeleteResponse> {
    return this.customerService.deleteCustomer(id);
  }
}
