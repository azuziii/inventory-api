import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetByIdArgs } from 'src/shared/args/get-by-id/get-by-id.args';
import { ErrorResponseType } from 'src/shared/decorators/meta/error-response-type.decorator';
import { OrderItem } from './entities/order-item.entity';
import {
  CreateOrderItemInput,
  UpdateOrderItemInput,
} from './inputs/order-item.input';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemResponse } from './responses/create-order-item.response';
import { OrderItemQueryResponse } from './responses/query-order-item.response';
import { UpdateOrderItemResponse } from './responses/update-order-item.response';

@Resolver(() => OrderItem)
export class OrderItemResolver {
  constructor(private readonly orderItemService: OrderItemService) {}

  @ErrorResponseType(OrderItemQueryResponse)
  @Query(() => OrderItemQueryResponse, { name: 'orderItem' })
  async getOrderItem(
    @Args() { id }: GetByIdArgs,
  ): Promise<OrderItemQueryResponse> {
    const queryResult = await this.orderItemService.getOrderItemOrFail(id);
    return new OrderItemQueryResponse(queryResult);
  }

  @ErrorResponseType(CreateOrderItemResponse)
  @Mutation(() => CreateOrderItemResponse, { name: 'createOrderItem' })
  async createOrderItem(
    @Args('input', { type: () => CreateOrderItemInput, nullable: false })
    input: CreateOrderItemInput,
  ): Promise<CreateOrderItemResponse> {
    const createResult = await this.orderItemService.createOrderItem(input);
    return new CreateOrderItemResponse(createResult);
  }

  @ErrorResponseType(UpdateOrderItemResponse)
  @Mutation(() => UpdateOrderItemResponse, { name: 'updateorderItem' })
  async updateorderItem(
    @Args('input', { type: () => UpdateOrderItemInput, nullable: false })
    input: UpdateOrderItemInput,
  ): Promise<UpdateOrderItemResponse> {
    const updateResult = await this.orderItemService.updateOrderItem(input);
    return new UpdateOrderItemResponse(updateResult);
  }
}
