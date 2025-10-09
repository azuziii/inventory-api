import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

@ArgsType()
export class GetByIdArgs {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  @IsUUID('all', {
    message: i18nValidationMessage('validation.invalid_uuid'),
  })
  id!: string;
}
