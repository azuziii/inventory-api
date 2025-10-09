import { PathImpl2 } from '@nestjs/config';
import { I18nTranslations } from 'src/generated/i18n.generated';

export interface LocalizedErrorProps {
  i18nKey: PathImpl2<I18nTranslations>;
  i18nArgs?: Record<string, any>;
}

export abstract class LocalizedError implements LocalizedErrorProps {
  constructor() {}

  i18nKey!: PathImpl2<I18nTranslations>;
  i18nArgs: Record<string, any> = {};

  lowerCaseArgs() {
    for (let i in this.i18nArgs) {
      if (typeof this.i18nArgs[i] === 'string') {
        this.i18nArgs[i] = this.i18nArgs[i].toLowerCase();
      }
    }
  }
}
