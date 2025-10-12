import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { CreateOrderDto } from '../dto/order.dto';

@InputType()
export class CreateOrderInput implements CreateOrderDto {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  order_number!: number;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  order_date!: Date;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  customer_id!: string;

  customer!: Customer;
}
