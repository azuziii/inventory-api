import { EntityManager } from 'typeorm';

export class OrderItemUpdateTotalShippedEvent {
  orderItemId!: string;
  quantity!: number;
  entityManager?: EntityManager;
}
