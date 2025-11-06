import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { isNumber, IsOptional } from 'class-validator';

export interface PaginationProps
  extends Pick<PaginationInput, 'page' | 'limit'> {
  total: number;
}

const PAGE_DEFAULT = 1;
const PAGE_MIN = 1;
const LIMIT_DEFAULT = 10;
const LIMIT_MIN = 1;
const LIMIT_MAX = 100;

@ArgsType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: PAGE_DEFAULT, nullable: true })
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => {
    const numValue = Number(value);
    if (!value || !isNumber(numValue) || numValue < PAGE_MIN) {
      return PAGE_DEFAULT;
    }
    return numValue;
  })
  page!: number;

  @Field(() => Int, { defaultValue: LIMIT_DEFAULT, nullable: true })
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => {
    const numValue = Number(value);
    if (!isNumber(numValue) || numValue < LIMIT_MIN) {
      return LIMIT_DEFAULT;
    } else if (numValue > LIMIT_MAX) {
      return LIMIT_MAX;
    }

    return numValue;
  })
  limit!: number;
}

@ObjectType('Pagination')
export class PaginationDto {
  constructor(props: PaginationProps) {
    console.log(1);
    console.log(props);
    console.log(1);
    const totalPages = Math.ceil(props.total / props.limit);

    this.total = props.total;
    this.page = props.page;
    this.limit = props.limit;
    this.totalPages = totalPages;
    this.hasNextPage = props.page < totalPages;
    this.hasPrevPage = props.page > 1;
  }

  @Field(() => Int, { nullable: true })
  total!: number;

  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { nullable: true })
  totalPages?: number;

  @Field({ nullable: true })
  hasNextPage?: boolean;

  @Field({ nullable: true })
  hasPrevPage?: boolean;
}
