import { createUnionType } from '@nestjs/graphql';
import {
  CustomerNotFound,
  ProductForbiddenRelation,
  ProductNotFound,
} from 'src/shared/domain-errors';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
import { OrderAlreadyExist } from '../errors/order.error';
import { OrderOutput } from '../outputs/order.output';

export type CreateOrderUnion = typeof CreateOrderUnion;
export const CreateOrderUnion = createUnionType({
  name: 'CreateOrderUnion',
  types: () => [
    OrderOutput,
    OrderAlreadyExist,
    InvalidDataException,
    CustomerNotFound,
    ProductNotFound,
    ProductForbiddenRelation,
  ],
});
