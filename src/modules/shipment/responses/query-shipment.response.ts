import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { ShipmentQueryUnion } from '../unions/query-shipment.union';

export type ShipmentQueryResponse = InstanceOfBaseResponse<ShipmentQueryUnion>;
export const ShipmentQueryResponse = BaseResponse<ShipmentQueryUnion>(
  'ShipmentQueryResponse',
  ShipmentQueryUnion,
);
