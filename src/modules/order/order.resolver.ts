import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ErrorResponseType } from 'src/shared/decorators/meta/error-response-type.decorator';
import { CreateOrderInput, UpdateOrderInput } from './inputs/order.input';
import { OrderService } from './order.service';
import { CreateOrderResponse } from './responses/create-order.response';
import { UpdateOrderResponse } from './responses/update-order.response';

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

  @ErrorResponseType(UpdateOrderResponse)
  @Mutation(() => UpdateOrderResponse, { name: 'updateOrder' })
  async updateOrder(
    @Args('input', { type: () => UpdateOrderInput, nullable: false })
    input: UpdateOrderInput,
  ): Promise<UpdateOrderResponse> {
    const updateResult = await this.orderService.updateOrder(input);
    return new UpdateOrderResponse(updateResult);
  }
}
