import { NotFound } from 'src/shared/errors/not-found.error';

const ENTITY_NAME = 'OrderItem';

export const OrderItemNotFound = NotFound(ENTITY_NAME);
