import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemResolver } from './order-item.resolver';
import { OrderItemService } from './order-item.service';

describe('OrderItemResolver', () => {
  let resolver: OrderItemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderItemResolver, OrderItemService],
    }).compile();

    resolver = module.get<OrderItemResolver>(OrderItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
