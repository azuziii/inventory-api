import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsUUID,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { ShipmentType } from '../enums/shipment-type.enum';

@InputType()
export class CreateShipmentInput implements CreateShipmentDto {
  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  delivery_date!: Date;

  @Field()
  @IsNotEmpty()
  @IsUUID('all', {
    message: i18nValidationMessage('validation.invalid_uuid'),
  })
  customer_id!: string;

  @Field()
  @IsNotEmpty()
  @IsNumberString()
  shipment_number!: string;

  @Field(() => ShipmentType, { defaultValue: ShipmentType.Outbound })
  @IsNotEmpty()
  @IsEnum(ShipmentType)
  shipment_type!: ShipmentType;
}
