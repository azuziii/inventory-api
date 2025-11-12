import { SetMetadata, Type } from '@nestjs/common';

export const RESPONSE_TYPE_META = 'RESPONSE_TYPE_META';

export const ResponseType = (arg: Type<any>) =>
  SetMetadata(RESPONSE_TYPE_META, arg);
