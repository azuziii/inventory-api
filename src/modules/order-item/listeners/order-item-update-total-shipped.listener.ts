import { OnEvent } from '@nestjs/event-emitter';
import { OrderItem } from '../entities/order-item.entity';
import { OrderItemUpdateTotalShippedEvent } from '../events/order-item-update-total-shipped.event';
import { OrderItemRepository } from '../order-item.repository';
import { OrderItemService } from '../order-item.service';

export class UpdateTotalShippedListener {
  constructor(
    private readonly repo: OrderItemRepository,
    private readonly service: OrderItemService,
  ) {}

  @OnEvent('order-item.update.total-shipped', {
    suppressErrors: false,
  })
  async updateTotalShipped({
    orderItemId,
    entityManager,
    quantity,
  }: OrderItemUpdateTotalShippedEvent): Promise<void> {
    const manager = entityManager ? entityManager : this.repo.getManager();
    const orderItem = await this.service.getOrderItemOrFail(orderItemId);
    orderItem.updateTotalShipped(quantity);
    await manager.update(OrderItem, orderItemId, orderItem);
  }
}
