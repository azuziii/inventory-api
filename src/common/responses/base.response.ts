import { Type } from '@nestjs/common';
import { Field, ObjectType, Union } from '@nestjs/graphql';

export function BaseResponse(name: string, union: Union<any>): Type<any> {
  const responseName = name;

  @ObjectType(responseName)
  class BaseResponse {
    constructor(response: typeof union) {
      this.response = response;
    }

    @Field(() => union)
    response!: typeof union;
  }

  return BaseResponse;
}
