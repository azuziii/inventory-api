import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { WithUuidInputMixin } from 'src/shared/inputs/get-by-id/get-by-id.mixin';
import { UpdateShipmentDto } from '../dto/update-shipment.dto';
import { CreateShipmentInput } from './create-shipment.input';

const UpdateOrderInputBase = WithUuidInputMixin(
  PartialType(OmitType(CreateShipmentInput, [])),
);

@InputType()
export class UpdateShipmentInput
  extends UpdateOrderInputBase
  implements UpdateShipmentDto {}
