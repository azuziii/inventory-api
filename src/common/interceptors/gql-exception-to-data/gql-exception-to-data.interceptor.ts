import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidationError } from 'class-validator';
import iterate from 'iterare';
import { I18nValidationException } from 'nestjs-i18n';
import { catchError, Observable, of } from 'rxjs';
import { ERROR_RESPONSE_TYPE_META } from 'src/common/decorators/meta/error-response-type.decorator';
import { BaseError } from 'src/common/errors/error';
import { InvalidData } from 'src/common/errors/invalid-data.error';
@Injectable()
export class GqlExceptionToDataInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlCtx = GqlExecutionContext.create(context);
    const ResponseWrapperClass = this.reflector.get(
      ERROR_RESPONSE_TYPE_META,
      context.getHandler(),
    );

    return next.handle().pipe(
      catchError((err) => {
        if (
          (err instanceof I18nValidationException ||
            err instanceof BaseError) &&
          !ResponseWrapperClass
        ) {
          console.error(
            `Metedata with key:'${ERROR_RESPONSE_TYPE_META}' was not set for '${gqlCtx.getHandler().name}'`,
          );
          throw err;
        }

        if (err instanceof I18nValidationException) {
          const flattenedErrors = this.flattenValidationErrors(err.errors);

          return of(
            new ResponseWrapperClass(
              new InvalidData({
                message: flattenedErrors[0],
              }),
            ),
          );
        } else if (err instanceof BaseError) {
          return of(new ResponseWrapperClass(err));
        }
        return of(err);
      }),
    );
  }

  flattenValidationErrors(validationErrors: ValidationError[]) {
    return iterate(validationErrors)
      .filter((error) => !!error.constraints)
      .map((error) => Object.values(error.constraints!))
      .flatten()
      .toArray();
  }
}
