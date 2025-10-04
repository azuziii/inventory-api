import { Reflector } from '@nestjs/core';
import { GqlExceptionToDataInterceptor } from './gql-exception-to-data-interceptor.interceptor';

describe('GqlExceptionToDataInterceptor', () => {
  it('should be defined', () => {
    const mockReflector = {
      get: jest.fn(),
    } as unknown as Reflector;
    expect(new GqlExceptionToDataInterceptor(mockReflector)).toBeDefined();
  });
});
