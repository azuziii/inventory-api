import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import {
  CustomerQueryResponse,
  CustomersQueryResponse,
} from './dto/customer.type';
import { CustomerArguments } from './dto/customer.input';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => CustomerQueryResponse)
  async customerResponse(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<CustomerQueryResponse> {
    const customer = await this.customerService.getCustomerOrFail(id);

    return {
      customer,
    };
  }

  @Query(() => CustomersQueryResponse)
  async customersResponse(
    @Args()
    args: CustomerArguments,
  ): Promise<CustomersQueryResponse> {
    console.log(args);
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
}
