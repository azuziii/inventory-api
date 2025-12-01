import { Reflector } from '@nestjs/core';
import { AutoMapInterceptor } from './auto-map.interceptor';

describe('AutoMapInterceptor', () => {
  it('should be defined', () => {
    const refelctor = new Reflector();
    expect(new AutoMapInterceptor(refelctor)).toBeDefined();
  });
});
