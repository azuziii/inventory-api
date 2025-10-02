import { createUnionType } from '@nestjs/graphql';
import { Customer } from '../entities/customer.entity';
import { NotFound } from 'src/common/errors/not-found.error';
import { AlreadyExist } from 'src/common/errors/alread-exist.error';
import { InUse } from 'src/common/errors/in-use.error';
import { DeleteResponse } from 'src/common/responses/delete.response';

export const CustomerQueryResult = createUnionType({
  name: 'CustomerQueryResult',
  types: () => [Customer, NotFound],
});

export const CreateCustomerResult = createUnionType({
  name: 'CreateCustomerResult',
  types: () => [Customer, AlreadyExist],
});

export const UpdateCustomerResult = createUnionType({
  name: 'UpdateCustomerResult',
  types: () => [Customer, NotFound, AlreadyExist],
});

export const DeleteCustomerResult = createUnionType({
  name: 'DeleteCustomerResult',
  types: () => [DeleteResponse, InUse],
});
