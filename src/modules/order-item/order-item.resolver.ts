import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetByIdArgs } from 'src/shared/args/get-by-id/get-by-id.args';
import { AutoMap } from 'src/shared/decorators/meta/auto-map.decorator';
import { ResponseType } from 'src/shared/decorators/meta/error-response-type.decorator';
import { OrderItem } from './entities/order-item.entity';
import {
  CreateOrderItemInput,
  UpdateOrderItemInput,
} from './inputs/order-item.input';
import { OrderItemService } from './order-item.service';
import { OrderItemOutput } from './outputs/order-item.output';
import { CreateOrderItemResponse } from './responses/create-order-item.response';
import { OrderItemQueryResponse } from './responses/query-order-item.response';
import { UpdateOrderItemResponse } from './responses/update-order-item.response';

@Resolver(() => OrderItemOutput)
export class OrderItemResolver {
  constructor(private readonly orderItemService: OrderItemService) {}

  @ResponseType(OrderItemQueryResponse)
  @AutoMap(OrderItemOutput)
  @Query(() => OrderItemQueryResponse, { name: 'orderItem' })
  async getOrderItem(@Args() { id }: GetByIdArgs): Promise<OrderItem> {
    return this.orderItemService.getOrderItemOrFail(id);
  }

  @ResponseType(CreateOrderItemResponse)
  @AutoMap(OrderItemOutput)
  @Mutation(() => CreateOrderItemResponse, { name: 'createOrderItem' })
  async createOrderItem(
    @Args('input', { type: () => CreateOrderItemInput, nullable: false })
    input: CreateOrderItemInput,
  ): Promise<OrderItem> {
    return this.orderItemService.createOrderItem(input);
  }

  @ResponseType(UpdateOrderItemResponse)
  @AutoMap(OrderItemOutput)
  @Mutation(() => UpdateOrderItemResponse, { name: 'updateOrderItem' })
  async updateOrderItem(
    @Args('input', { type: () => UpdateOrderItemInput, nullable: false })
    input: UpdateOrderItemInput,
  ): Promise<OrderItem> {
    return this.orderItemService.updateOrderItem(input);
  }
}
