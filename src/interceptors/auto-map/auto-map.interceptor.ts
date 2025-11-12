import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { map, Observable } from 'rxjs';
import { AUTO_MAP_META } from 'src/shared/decorators/meta/auto-map.decorator';
import { mapToOutput } from 'src/utils/map-to-output.util';

@Injectable()
export class AutoMapInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlCtx = GqlExecutionContext.create(context);

    const ClassToMapTo = this.reflector.get(
      AUTO_MAP_META,
      context.getHandler(),
    );
    return next.handle().pipe(
      map((value) => {
        if (!ClassToMapTo) {
          return value;
        }

        return mapToOutput(ClassToMapTo, value);
      }),
    );
  }
}
