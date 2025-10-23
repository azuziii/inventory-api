import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ErrorResponseType } from 'src/shared/decorators/meta/error-response-type.decorator';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderItemInput } from './inputs/order-item.input';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemResponse } from './responses/create-order-item.response';

@Resolver(() => OrderItem)
export class OrderItemResolver {
  constructor(private readonly orderItemService: OrderItemService) {}

  @ErrorResponseType(CreateOrderItemResponse)
  @Mutation(() => CreateOrderItemResponse, { name: 'createOrderItem' })
  async createOrderItem(
    @Args('input', { type: () => CreateOrderItemInput, nullable: false })
    input: CreateOrderItemInput,
  ): Promise<CreateOrderItemResponse> {
    const createResult = await this.orderItemService.createOrderItem(input);
    console.log(createResult);
    return new CreateOrderItemResponse(createResult);
  }
}
