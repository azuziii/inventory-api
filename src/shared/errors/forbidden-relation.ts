import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseErrorWithEntityName } from './error';

export interface ForbiddenRelationProps {
  resourceName: string;
}

export function ForbiddenRelation(entityName: string) {
  const name = `${entityName}ForbiddenRelation`;
  @ObjectType(name)
  class ForbiddenRelation
    extends BaseErrorWithEntityName
    implements ForbiddenRelationProps
  {
    constructor(props: ForbiddenRelationProps) {
      super({
        code: 'FORBIDDEN_RELATION',
        entityName,
        i18nKey: 'common.errors.ForbiddenRelation',
        i18nArgs: {
          entityName,
          resourceName: props.resourceName,
        },
      });

      Object.assign(this, props);
    }

    resourceName!: string;

    @Field(() => ID)
    id!: string;
  }

  return ForbiddenRelation;
}
