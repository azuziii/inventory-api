import { Customer } from 'src/modules/customer/entities/customer.entity';
import { BaseUUIDEntity } from 'src/shared/base/base.entity';
import { ColumnNumericTransformer } from 'src/shared/db-transformers/numeric.transformer';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

@Entity('product')
@Unique('UQ_product_customer_name', ['customer', 'name'])
export class Product extends BaseUUIDEntity {
  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  code!: string;

  @Column({
    type: 'float',
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  price!: number;

  @Column({ type: 'boolean', default: false })
  isSample!: boolean;

  @ManyToOne(() => Customer, { lazy: true })
  @JoinColumn({
    name: 'customer_id',
    foreignKeyConstraintName: 'FK_product_customer',
  })
  customer!: Promise<Customer>;

  @Column({ type: 'uuid' })
  customer_id!: string;
}
