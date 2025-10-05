import { ICustomer } from '../../interfaces/customer.interface';
import { GetCustomerPipe } from './get-customer.pipe';

describe('GetCustomerPipe', () => {
  it('should be defined', () => {
    const mockCustomerService: ICustomer = {
      getCustomer: jest.fn(),
    };
    expect(new GetCustomerPipe(mockCustomerService)).toBeDefined();
  });
});
