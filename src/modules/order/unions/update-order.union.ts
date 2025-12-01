import { createUnionType } from '@nestjs/graphql';
import { CustomerNotFound } from 'src/shared/domain-errors';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { OrderAlreadyExist, OrderNotFound } from '../errors/order.error';
import { OrderOutput } from '../outputs/order.output';

export type UpdateOrderUnion = typeof UpdateOrderUnion;
export const UpdateOrderUnion = createUnionType({
  name: 'UpdateOrderUnion',
  types: () => [
    OrderOutput,
    OrderNotFound,
    OrderAlreadyExist,
    InvalidDataException,
    CustomerNotFound,
  ],
});
