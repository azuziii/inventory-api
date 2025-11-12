import { Reflector } from '@nestjs/core';
import { GqlResponseWrapperInterceptor } from './gql-response-wrapper.interceptor';

describe('GqlResponseWrapperInterceptor', () => {
  it('should be defined', () => {
    const mockReflector = {
      get: jest.fn(),
    } as unknown as Reflector;
    expect(new GqlResponseWrapperInterceptor(mockReflector)).toBeDefined();
  });
});
