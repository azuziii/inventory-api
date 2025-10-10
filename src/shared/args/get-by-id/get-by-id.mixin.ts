import { applyDecorators, Type } from '@nestjs/common';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export interface IWithUuidArg {
  id: string;
}

export function WithUuidArgMixin<TBase extends Type<any>>(
  Base: TBase,
  options: {
    required?: boolean;
  } = {},
): Type<IWithUuidArg> & TBase {
  const isRequired = options.required ?? false;
  @ArgsType()
  class WithUuidMixin extends Base {
    @Field(() => ID, { nullable: !isRequired })
    @applyDecorators(isRequired ? IsNotEmpty() : IsOptional())
    @IsUUID('all', {
      message: i18nValidationMessage('validation.invalid_uuid'),
    })
    id!: string;
  }

  return WithUuidMixin;
}
