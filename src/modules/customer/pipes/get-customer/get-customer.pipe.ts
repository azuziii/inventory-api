import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ICustomer } from '../../interfaces/customer.interface';

@Injectable()
export class GetCustomerPipe implements PipeTransform {
  constructor(@Inject(ICustomer) private readonly customerService: ICustomer) {}

  async transform(
    { customer_id, ...value }: { customer_id?: string },
    metadata: ArgumentMetadata,
  ) {
    if (!customer_id || typeof customer_id != 'string') return value;

    const customer = await this.customerService.getCustomer({
      where: {
        id: customer_id,
      },
    });

    return {
      ...value,
      customer,
    };
  }
}
