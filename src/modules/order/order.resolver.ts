import { UsePipes } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetByIdArgs } from 'src/shared/args/get-by-id/get-by-id.args';
import { AutoMap } from 'src/shared/decorators/meta/auto-map.decorator';
import { ResponseType } from 'src/shared/decorators/meta/error-response-type.decorator';
import { mapToOutput } from 'src/utils/map-to-output.util';
import { OrderArguments } from './args/order.args';
import { Order } from './entities/order.entity';
import { CreateOrderInput, UpdateOrderInput } from './inputs/order.input';
import { OrderService } from './order.service';
import { OrderList } from './outputs/order-list.output';
import { OrderOutput } from './outputs/order.output';
import { NormalizeOrderItemsPipe } from './pipes/normalize-order-items/normalize-order-items.pipe';
import { CreateOrderResponse } from './responses/create-order.response';
import { OrdersQueryResponse } from './responses/list-orders.response';
import { OrderQueryResponse } from './responses/query-order.response';
import { UpdateOrderResponse } from './responses/update-order.response';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @ResponseType(OrderQueryResponse)
  @AutoMap(OrderOutput)
  @Query(() => OrderQueryResponse, { name: 'order' })
  async getOrder(@Args() { id }: GetByIdArgs): Promise<Order> {
    return this.orderService.getOrderOrFail(id);
  }

  @ResponseType(OrdersQueryResponse)
  @Query(() => OrdersQueryResponse, { name: 'orders' })
  async listOrder(
    @Args()
    args: OrderArguments,
  ): Promise<OrderList> {
    const [orders, count] = await this.orderService.listOrders(
      args.toManyOptions(),
    );

    const orderList = new OrderList(mapToOutput(OrderOutput, orders), {
      ...args,
      total: count,
    });

    return orderList;
  }

  @ResponseType(CreateOrderResponse)
  @AutoMap(OrderOutput)
  @Mutation(() => CreateOrderResponse, { name: 'createOrder' })
  @UsePipes(NormalizeOrderItemsPipe)
  async createOrder(@Args('input') input: CreateOrderInput): Promise<Order> {
    return this.orderService.createOrder(input);
  }

  @ResponseType(UpdateOrderResponse)
  @AutoMap(OrderOutput)
  @Mutation(() => UpdateOrderResponse, { name: 'updateOrder' })
  async updateOrder(
    @Args('input', { type: () => UpdateOrderInput, nullable: false })
    input: UpdateOrderInput,
  ): Promise<Order> {
    return this.orderService.updateOrder(input);
  }
}
