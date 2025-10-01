import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { CustomerRepository } from './customer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
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
