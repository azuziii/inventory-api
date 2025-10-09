import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { I18nContext, I18nValidationException } from 'nestjs-i18n';
import { formatI18nErrors } from 'nestjs-i18n/dist/utils';
import { catchError, Observable } from 'rxjs';
import { BaseError } from 'src/shared/errors/error';

@Injectable()
export class I18nInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const i18n = I18nContext.current()!;
        if (err instanceof I18nValidationException) {
          const errors = formatI18nErrors(err.errors ?? [], i18n.service, {
            lang: i18n.lang,
          });

          throw new I18nValidationException(errors);
        } else if (err instanceof BaseError) {
          const translatedMessage = i18n.t(err.i18nKey, {
            args: err.i18nArgs,
          }) as string;
          err.message = translatedMessage;

          throw err;
        }

        throw err;
      }),
    );
  }
}
