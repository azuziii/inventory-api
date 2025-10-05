import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class GetByIdArgs {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  @IsUUID()
  id!: string;
}
