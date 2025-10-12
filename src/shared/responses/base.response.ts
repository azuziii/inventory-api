import { Field, ObjectType, Union } from '@nestjs/graphql';

export function BaseResponse<TUnion>(name: string, union: Union<any>) {
  const responseName = name;

  @ObjectType(responseName)
  class BaseResponse {
    constructor(response: TUnion) {
      this.result = response;
    }

    @Field(() => union)
    result!: TUnion;
  }

  return BaseResponse;
}

export type InstanceOfBaseResponse<TUnion> = InstanceType<
  ReturnType<typeof BaseResponse<TUnion>>
>;
