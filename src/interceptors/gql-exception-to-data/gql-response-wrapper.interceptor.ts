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
import { mapChildrenToValidationErrors } from 'nestjs-i18n/dist/utils';
import { catchError, map, Observable, of } from 'rxjs';
import { RESPONSE_TYPE_META } from 'src/shared/decorators/meta/error-response-type.decorator';
import { BaseError } from 'src/shared/errors/error';
import { InvalidDataException } from 'src/shared/errors/invalid-data.error';
@Injectable()
export class GqlResponseWrapperInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlCtx = GqlExecutionContext.create(context);
    const ResponseWrapperClass = this.reflector.get(
      RESPONSE_TYPE_META,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((value) => {
        if (!ResponseWrapperClass) {
          throw `Metedata with key:'${RESPONSE_TYPE_META}' was not set for '${gqlCtx.getHandler().name}'`;
        }

        return new ResponseWrapperClass(value);
      }),
      catchError((err) => {
        if (
          (err instanceof I18nValidationException ||
            err instanceof BaseError) &&
          !ResponseWrapperClass
        ) {
          console.error(
            `Metedata with key:'${RESPONSE_TYPE_META}' was not set for '${gqlCtx.getHandler().name}'`,
          );
          throw err;
        }

        if (err instanceof I18nValidationException) {
          const flattenedErrors = this.flattenValidationErrors(err.errors);

          return of(
            new ResponseWrapperClass(
              new InvalidDataException({
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
      .map((error) => mapChildrenToValidationErrors(error))
      .flatten()
      .filter((error) => !!error.constraints)
      .map((error) => Object.values(error.constraints!))
      .flatten()
      .toArray();
  }
}
