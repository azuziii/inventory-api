import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { UpdateShipmentUnion } from '../unions/update-shipment.union';

export type UpdateShipmentResponse =
  InstanceOfBaseResponse<UpdateShipmentUnion>;
export const UpdateShipmentResponse = BaseResponse<UpdateShipmentUnion>(
  'UpdateShipmentResponse',
  UpdateShipmentUnion,
);
