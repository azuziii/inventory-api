import { SetMetadata, Type } from '@nestjs/common';

export const AUTO_MAP_META = 'AUTO_MAP_META';

export const AutoMap = (arg: Type<any>) => SetMetadata(AUTO_MAP_META, arg);
