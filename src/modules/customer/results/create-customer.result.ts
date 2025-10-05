import { createUnionType } from '@nestjs/graphql';
import { AlreadyExist } from 'src/common/errors/already-exist.error';
import { InvalidData } from 'src/common/errors/invalid-data.error';
import { Customer } from '../entities/customer.entity';

export const CreateCustomerResult = createUnionType({
  name: 'CreateCustomerResult',
  types: () => [Customer, AlreadyExist, InvalidData],
});
