import { SetMetadata, Type } from '@nestjs/common';

export const ERROR_RESULT_TYPE_META = 'ERROR_RESULT_TYPE_META';

export const ErrorResultType = (arg: Type<any>) =>
  SetMetadata(ERROR_RESULT_TYPE_META, arg);
