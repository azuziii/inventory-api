import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';
import { CustomerOutput } from 'src/modules/customer/outputs/customer.output';
import { BaseOutput } from 'src/shared/base/output';
import { ShipmentType } from '../enums/shipment-type.enum';

@ObjectType('Shipment')
export class ShipmentOutput extends BaseOutput {
  @Field(() => ID)
  @Expose()
  id!: string;

  @Field(() => Date, { nullable: false })
  @Expose()
  delivery_date!: Date;

  @Field(() => CustomerOutput, { nullable: false })
  @Type(() => CustomerOutput)
  @Expose()
  customer!: CustomerOutput;

  @Field({ nullable: false })
  @Expose()
  shipment_number!: string;

  @Field({ nullable: false })
  @Expose()
  shipment_type!: ShipmentType;
}
