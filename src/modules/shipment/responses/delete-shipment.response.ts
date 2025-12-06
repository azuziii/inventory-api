import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { DeleteShipmentUnion } from '../unions/delete-shipment.union';

export type DeleteShipmentResponse =
  InstanceOfBaseResponse<DeleteShipmentUnion>;
export const DeleteShipmentResponse = BaseResponse<DeleteShipmentUnion>(
  'DeleteShipmentResponse',
  DeleteShipmentUnion,
);
