import { Shipment } from '../entities/shipment.entity';

export interface CreateShipmentDto
  extends Required<
    Pick<
      Shipment,
      'customer_id' | 'delivery_date' | 'shipment_number' | 'shipment_type'
    >
  > {}
