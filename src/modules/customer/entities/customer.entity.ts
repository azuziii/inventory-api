import { BaseUUIDEntity } from 'src/shared/base/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('Customer')
export class Customer extends BaseUUIDEntity {
  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  address!: string;

  @Column({ type: 'text' })
  city!: string;

  @Column({ type: 'text' })
  country!: string;

  @Index('UQ_customer_ice', { unique: true })
  @Column({ type: 'text' })
  ice!: string;

  @Column({ type: 'text', default: '' })
  contact_name!: string;

  @Column({ type: 'text', default: '' })
  contact_phone!: string;

  @Column({ type: 'text', default: '' })
  contact_email!: string;
}
