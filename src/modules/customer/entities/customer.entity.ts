import { Field, ObjectType } from '@nestjs/graphql';
import { BaseUUIDEntity } from 'src/shared/base/base.entity';
import { Column, Entity, Index } from 'typeorm';

@ObjectType()
@Entity('Customer')
export class Customer extends BaseUUIDEntity {
  @Field({ nullable: false })
  @Column({ type: 'text' })
  name!: string;

  @Field({ nullable: false })
  @Column({ type: 'text' })
  address!: string;

  @Field({ nullable: false })
  @Column({ type: 'text' })
  city!: string;

  @Field({ nullable: false })
  @Column({ type: 'text' })
  country!: string;

  @Field({ nullable: false })
  @Index('UQ_customer_ice', { unique: true })
  @Column({ type: 'text' })
  ice!: string;

  @Field({ defaultValue: '' })
  @Column({ type: 'text', default: '' })
  contact_name!: string;

  @Field({ defaultValue: '' })
  @Column({ type: 'text', default: '' })
  contact_phone!: string;

  @Field({ defaultValue: '' })
  @Column({ type: 'text', default: '' })
  contact_email!: string;
}
