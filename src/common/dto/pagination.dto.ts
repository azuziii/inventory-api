import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
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
  @Field(() => Int, { defaultValue: 1, nullable: true })
  @IsOptional()
  @Transform(({ value }) => {
    const numValue = Number(value);
    if (!isNumber(numValue) || numValue < PAGE_MIN) {
      return PAGE_DEFAULT;
    }
    return numValue;
  })
  page: number = PAGE_DEFAULT;

  @Field(() => Int, { defaultValue: 10, nullable: true })
  @IsOptional()
  @Transform(({ value }) => {
    const numValue = Number(value);
    if (!isNumber(numValue) || numValue < LIMIT_MIN || numValue > LIMIT_MAX) {
      return LIMIT_DEFAULT;
    }
    return numValue;
  })
  limit: number = LIMIT_DEFAULT;
}

@ObjectType('Pagination')
export class PaginationDto {
  constructor(props: PaginationProps) {
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
