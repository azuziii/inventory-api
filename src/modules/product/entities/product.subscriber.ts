import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { Product } from './product.entity';

@Injectable()
@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  afterLoad(entity: Product): Promise<any> | void {
    this.addLocalizedSamplePrefix(entity);
  }

  addLocalizedSamplePrefix(entity: Product) {
    if (entity.isSample) {
      const localizedSuffix = this.i18n.t('common.sample.displayName');
      const name = `${localizedSuffix} ${entity.name}`;
      entity.name = name;
    }
  }
}
