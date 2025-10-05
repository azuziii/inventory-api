import { AlreadyExist } from 'src/common/errors/already-exist.error';
import { Customer } from '../entities/customer.entity';
import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';

export const CreateCustomerResult = createUnionType({
  name: 'CreateCustomerResult',
  types: () => [Customer, AlreadyExist, InvalidData],
});
