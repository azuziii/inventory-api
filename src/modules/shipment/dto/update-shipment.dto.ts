import { CreateShipmentDto } from './create-shipment.dto';

export interface UpdateShipmentDto extends Partial<CreateShipmentDto> {
  id: string;
}
