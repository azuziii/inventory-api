import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ErrorResponseType } from 'src/shared/decorators/meta/error-response-type.decorator';
import { CreateOrderInput } from './inputs/order.input';
import { OrderService } from './order.service';
import { CreateOrderResponse } from './responses/create-order.response';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @ErrorResponseType(CreateOrderResponse)
  @Mutation(() => CreateOrderResponse, { name: 'createOrder' })
  async createOrder(
    @Args('input') input: CreateOrderInput,
  ): Promise<CreateOrderResponse> {
    const order = await this.orderService.createOrder(input);
    console.log(input);
    return new CreateOrderResponse(order);
  }
}
