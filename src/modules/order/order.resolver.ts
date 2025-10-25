import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetByIdArgs } from 'src/shared/args/get-by-id/get-by-id.args';
import { ErrorResponseType } from 'src/shared/decorators/meta/error-response-type.decorator';
import { OrderArguments } from './args/order.args';
import { CreateOrderInput, UpdateOrderInput } from './inputs/order.input';
import { OrderService } from './order.service';
import { OrderList } from './outputs/order-list.output';
import { CreateOrderResponse } from './responses/create-order.response';
import { OrdersQueryResponse } from './responses/list-orders.response';
import { OrderQueryResponse } from './responses/query-order.response';
import { UpdateOrderResponse } from './responses/update-order.response';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @ErrorResponseType(OrderQueryResponse)
  @Query(() => OrderQueryResponse, { name: 'order' })
  async getOrder(@Args() { id }: GetByIdArgs): Promise<OrderQueryResponse> {
    const queryResult = await this.orderService.getOrderOrFail(id);
    return new OrderQueryResponse(queryResult);
  }

  @ErrorResponseType(OrdersQueryResponse)
  @Query(() => OrdersQueryResponse, { name: 'orders' })
  async listOrder(
    @Args()
    args: OrderArguments,
  ): Promise<OrdersQueryResponse> {
    const [orders, count] = await this.orderService.listOrders(
      args.toManyOptions(),
    );

    const orderList = new OrderList(orders, {
      ...args,
      total: count,
    });

    return new OrdersQueryResponse(orderList);
  }

  @ErrorResponseType(CreateOrderResponse)
  @Mutation(() => CreateOrderResponse, { name: 'createOrder' })
  async createOrder(
    @Args('input') input: CreateOrderInput,
  ): Promise<CreateOrderResponse> {
    const order = await this.orderService.createOrder(input);
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
