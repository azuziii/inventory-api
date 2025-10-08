import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetByIdArgs } from 'src/common/args/get-by-id.args';
import { ErrorResponseType } from 'src/common/decorators/meta/error-response-type.decorator';
import { CustomerArguments } from './args/customer.args';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import {
  CreateCustomerInput,
  UpdateCustomerInput,
} from './inputs/customer.input';
import { CustomerList } from './outputs/customer-list.output';
import { CreateCustomerResponse } from './responses/create-customer.response';
import { DeleteCustomerResponse } from './responses/delete-customer.response';
import { CustomerQueryResponse } from './responses/query-customer.response';
import { CustomersQueryResponse } from './responses/query-customers.response';
import { UpdateCustomerResponse } from './responses/update-customer.response';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @ErrorResponseType(CustomerQueryResponse)
  @Query(() => CustomerQueryResponse, { name: 'customer' })
  async getCustomer(
    @Args() { id }: GetByIdArgs,
  ): Promise<CustomerQueryResponse> {
    const queryResult = await this.customerService.getCustomerOrFail(id);
    return new CustomerQueryResponse(queryResult);
  }

  @ErrorResponseType(CustomersQueryResponse)
  @Query(() => CustomersQueryResponse, { name: 'customers' })
  async listCustomer(
    @Args()
    args: CustomerArguments,
  ): Promise<CustomersQueryResponse> {
    const [customers, count] = await this.customerService.listCustomers(
      args.toManyOptions(),
    );

    const customerList = new CustomerList(customers, {
      ...args,
      total: count,
    });

    return new CustomersQueryResponse(customerList);
  }

  @ErrorResponseType(CreateCustomerResponse)
  @Mutation(() => CreateCustomerResponse, { name: 'createCustomer' })
  async createCustomer(
    @Args('input', { type: () => CreateCustomerInput, nullable: false })
    input: CreateCustomerInput,
  ): Promise<CreateCustomerResponse> {
    const createResult = await this.customerService.createCustomer(input);
    return new CreateCustomerResponse(createResult);
  }

  @ErrorResponseType(UpdateCustomerResponse)
  @Mutation(() => UpdateCustomerResponse, { name: 'updateCustomer' })
  async updateCustomer(
    @Args('input', { type: () => UpdateCustomerInput, nullable: false })
    input: UpdateCustomerInput,
  ): Promise<UpdateCustomerResponse> {
    const updateResult = await this.customerService.updateCustomer(input);
    return new UpdateCustomerResponse(updateResult);
  }

  @ErrorResponseType(DeleteCustomerResponse)
  @Mutation(() => DeleteCustomerResponse, { name: 'deleteCustomer' })
  async deleteCustomer(
    @Args() { id }: GetByIdArgs,
  ): Promise<DeleteCustomerResponse> {
    const deleteResult = await this.customerService.deleteCustomer(id);
    return new DeleteCustomerResponse(deleteResult);
  }
}
