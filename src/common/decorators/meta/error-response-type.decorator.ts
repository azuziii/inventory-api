import { SetMetadata, Type } from '@nestjs/common';

export const ERROR_RESPONSE_TYPE_META = 'ERROR_RESPONSE_TYPE_META';

export const ErrorResponseType = (arg: Type<any>) =>
  SetMetadata(ERROR_RESPONSE_TYPE_META, arg);
