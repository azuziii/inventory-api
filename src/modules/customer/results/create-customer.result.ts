import { AlreadyExist } from 'src/common/errors/already-exist.error';
import { Customer } from '../entities/customer.entity';
import { createUnionType } from '@nestjs/graphql';

export const CreateCustomerResult = createUnionType({
  name: 'CreateCustomerResult',
  types: () => [Customer, AlreadyExist],
});
