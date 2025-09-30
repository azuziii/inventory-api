import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseUUIDEntity } from 'src/common/base/base.entity';
import { ColumnNumericTransformer } from 'src/common/db-transformers/numeric.transformer';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';

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

  @ManyToOne(() => Customer)
  customer!: Customer;
}
