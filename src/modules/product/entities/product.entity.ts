import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { BaseUUIDEntity } from 'src/shared/base/base.entity';
import { ColumnNumericTransformer } from 'src/shared/db-transformers/numeric.transformer';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

@ObjectType()
@Entity('product')
@Unique('UQ_product_customer_name', ['customer', 'name'])
export class Product extends BaseUUIDEntity {
  @Field({ nullable: false })
  @Column({ type: 'text' })
  name!: string;

  @Field({ nullable: false })
  @Column({ type: 'text' })
  code!: string;

  @Field(() => Float, { nullable: false, defaultValue: 0 })
  @Column({
    type: 'float',
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  price!: number;

  @Field({ nullable: false, defaultValue: false })
  @Column({ type: 'boolean', default: false })
  isSample!: boolean;

  @Field(() => Customer, { nullable: false })
  @ManyToOne(() => Customer, { lazy: true })
  @JoinColumn({
    name: 'customer_id',
    foreignKeyConstraintName: 'FK_product_customer',
  })
  customer!: Customer;
}
