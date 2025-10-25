import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateOrderItemDto } from 'src/modules/order-item/dto/order-item.dto';
import { CreateOrderDto } from '../../dto/order.dto';

@Injectable()
export class NormalizeOrderItemsPipe implements PipeTransform {
  transform(value: CreateOrderDto, metadata: ArgumentMetadata) {
    const seenItems: Record<string, CreateOrderItemDto> = {};

    for (let item of value.items) {
      if (!seenItems[item.product_id]) {
        seenItems[item.product_id] = item;
      } else {
        seenItems[item.product_id].quantity += item.quantity;
      }
    }

    const normalizedItemsArray = Object.values(seenItems);

    Object.assign(value, { items: normalizedItemsArray });

    return value;
  }
}
