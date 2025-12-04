import {
  BaseResponse,
  InstanceOfBaseResponse,
} from 'src/shared/responses/base.response';
import { CreateShipmentUnion } from '../unions/create-shipment.union';

export type CreateShipmentResponse =
  InstanceOfBaseResponse<CreateShipmentUnion>;
export const CreateShipmentResponse = BaseResponse<CreateShipmentUnion>(
  'CreateShipmentResponse',
  CreateShipmentUnion,
);
