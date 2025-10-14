import { UsePipes } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ErrorResponseType } from 'src/shared/decorators/meta/error-response-type.decorator';
import { GetProductPipe } from '../product/pipes/get-product/get-product.pipe';
import {
  CreateOrderItemInput,
  UpdateOrderItemInput,
} from './inputs/order-item.input';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemResponse } from './responses/create-order-item.response';
import { UpdateOrderItemResponse } from './responses/update-order-item.response';

@Resolver()
export class OrderItemResolver {
  constructor(private readonly orderItemService: OrderItemService) {}

  @ErrorResponseType(CreateOrderItemResponse)
  @UsePipes(GetProductPipe)
  @Mutation(() => CreateOrderItemResponse, { name: 'createOrderItem' })
  async createOrderItem(
    @Args('input', { type: () => CreateOrderItemInput, nullable: false })
    input: CreateOrderItemInput,
  ): Promise<CreateOrderItemResponse> {
    const createResult = await this.orderItemService.createOrderItem(input);
    console.log(createResult);
    return new CreateOrderItemResponse(createResult);
  }

  @ErrorResponseType(UpdateOrderItemResponse)
  @UsePipes(GetProductPipe)
  @Mutation(() => UpdateOrderItemResponse, { name: 'updateorderItem' })
  async updateorderItem(
    @Args('input', { type: () => UpdateOrderItemInput, nullable: false })
    input: UpdateOrderItemInput,
  ): Promise<UpdateOrderItemResponse> {
    const updateResult = await this.orderItemService.updateOrderItem(input);
    return new UpdateOrderItemResponse(updateResult);
  }
}
