import { Type } from '@nestjs/common';
import { Field, ObjectType, Union } from '@nestjs/graphql';

export function BaseResponse(name: string, union: Union<any>): Type<any> {
  const responseName = name;

  @ObjectType(responseName)
  class BaseResponse {
    constructor(response: typeof union) {
      this.result = response;
    }

    @Field(() => union)
    result!: typeof union;
  }

  return BaseResponse;
}
