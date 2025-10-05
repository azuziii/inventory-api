import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { catchError, Observable, of } from 'rxjs';
import { ERROR_RESULT_TYPE_META } from 'src/common/decorators/meta/error-result-type.decorator';
import { InvalidData } from 'src/common/errors/invalid-data.error';

@Injectable()
export class GqlExceptionToDataInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlCtx = GqlExecutionContext.create(context);
    const ResponseWrapperClass = this.reflector.get(
      ERROR_RESULT_TYPE_META,
      context.getHandler(),
    );

    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof BadRequestException) {
          if (!ResponseWrapperClass) {
            console.error(
              `Metedata with key:'${ERROR_RESULT_TYPE_META}' was not set for '${gqlCtx.getHandler().name}'`,
            );
            throw err;
          }

          const response = err.getResponse();
          let message: string;

          if (typeof response === 'object') {
            message =
              response['message'] && Array.isArray(response['message'])
                ? response['message'][0]
                : response['message'];
          } else {
            message = response || err.message;
          }

          return of(
            new ResponseWrapperClass(
              new InvalidData({
                message,
              }),
            ),
          );
        } else if ('__isError' in err) {
          return of(new ResponseWrapperClass(err));
        }
        return of(err);
      }),
    );
  }
}
