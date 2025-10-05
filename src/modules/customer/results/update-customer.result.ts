import { NotFound } from 'src/common/errors/not-found.error';
import { Customer } from '../entities/customer.entity';
import { AlreadyExist } from 'src/common/errors/already-exist.error';
import { createUnionType } from '@nestjs/graphql';
import { InvalidData } from 'src/common/errors/invalid-data.error';

export const UpdateCustomerResult = createUnionType({
  name: 'UpdateCustomerResult',
  types: () => [Customer, NotFound, AlreadyExist, InvalidData],
});
