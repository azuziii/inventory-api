import { Customer } from 'src/modules/customer/entities/customer.entity';
import { BaseUUIDEntity } from 'src/shared/base/base.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ShipmentType } from '../enums/shipment-type.enum';

@Entity('shipment')
@Index('UQ_SHIPMENT_NUMBER_YEAR', ['shipment_year', 'shipment_number'], {
  unique: true,
})
export class Shipment extends BaseUUIDEntity {
  @Column({ type: 'timestamp' })
  delivery_date!: Date;

  @Column({ type: 'text' })
  shipment_year!: string;

  @Column({ type: 'text' })
  shipment_number!: string;

  @Column({ type: 'enum', enum: ShipmentType, default: ShipmentType.Outbound })
  shipment_type!: ShipmentType;

  @ManyToOne(() => Customer, { lazy: true })
  @JoinColumn({
    name: 'customer_id',
    foreignKeyConstraintName: 'FK_SHIPMENT_CUSTOMER',
  })
  customer!: Promise<Customer>;

  @Column({ type: 'uuid' })
  customer_id!: string;

  @BeforeInsert()
  @BeforeUpdate()
  setShipmentYear() {
    this.shipment_year = new Date(this.delivery_date).getFullYear().toString();
  }
}
