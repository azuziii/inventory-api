import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { ICustomer } from './interfaces/customer.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [
    CustomerResolver,
    CustomerService,
    CustomerRepository,
    {
      provide: ICustomer,
      useExisting: CustomerService,
    },
  ],
  exports: [ICustomer],
})
export class CustomerModule {}
