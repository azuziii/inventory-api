import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType('Customer')
export class CustomerOutput {
  @Field(() => ID)
  @Expose()
  id!: string;

  @Field({ nullable: false })
  @Expose()
  name!: string;

  @Field({ nullable: false })
  @Expose()
  address!: string;

  @Field({ nullable: false })
  @Expose()
  city!: string;

  @Field({ nullable: false })
  @Expose()
  country!: string;

  @Field({ nullable: false })
  @Expose()
  ice!: string;

  @Field({ defaultValue: '' })
  @Expose()
  contact_name!: string;

  @Field({ defaultValue: '' })
  @Expose()
  contact_phone!: string;

  @Field({ defaultValue: '' })
  @Expose()
  contact_email!: string;
}
