import { Type } from '@nestjs/common';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export interface IWithUuidInput {
  id: string;
}

export function WithUuidInputMixin<TBase extends Type<any>>(
  Base: TBase,
): Type<IWithUuidInput> & TBase {
  @InputType()
  class WithUuidMixin extends Base {
    @Field(() => ID, { nullable: false })
    @IsNotEmpty()
    @IsUUID('all', {
      message: i18nValidationMessage('validation.invalid_uuid'),
    })
    id!: string;
  }

  return WithUuidMixin;
}
