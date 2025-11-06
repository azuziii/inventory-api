import { plainToInstance } from 'class-transformer';
import { PaginationDto, PaginationInput } from './pagination.dto';

import { Test, TestingModule } from '@nestjs/testing';
import { validate } from 'class-validator';

describe('PaginationInput', () => {
  const PAGE_DEFAULT = 1;
  const LIMIT_MIN = 1;
  const LIMIT_MAX = 100;
  const LIMIT_DEFAULT = 10;

  it('should set default values when nothing is passed', async () => {
    const pagination = {
      limit: undefined,
      page: undefined,
    };

    const paginationInput = plainToInstance(PaginationInput, pagination, {
      enableImplicitConversion: true,
    });

    expect(paginationInput.page).toBe(PAGE_DEFAULT);
    expect(paginationInput.limit).toBe(LIMIT_DEFAULT);
  });

  it('should set default values when invalid values passed', async () => {
    let pagination: Record<string, any> = {
      limit: 'limig',
      page: 'page',
    };

    let paginationInput = plainToInstance(PaginationInput, pagination, {
      enableImplicitConversion: true,
    });

    expect(paginationInput.page).toBe(PAGE_DEFAULT);
    expect(paginationInput.limit).toBe(LIMIT_DEFAULT);

    pagination = {
      limit: -100,
      page: -520,
    };

    paginationInput = plainToInstance(PaginationInput, pagination, {
      enableImplicitConversion: true,
    });

    expect(paginationInput.page).toBe(PAGE_DEFAULT);
    expect(paginationInput.limit).toBe(LIMIT_DEFAULT);
  });

  it('should set max limit value when limit exceeds LIMIT_MAX', () => {
    const pagination = {
      limit: LIMIT_MAX + Math.floor(Math.random() * 1000),
    };

    const paginationInput = plainToInstance(PaginationInput, pagination, {
      enableImplicitConversion: true,
    });

    expect(paginationInput.limit).toBe(LIMIT_MAX);
  });
});

describe('PaginationDto', () => {
  it('should correctly calculate totalPages using ceiling', () => {
    const props = {
      total: 105,
      page: 1,
      limit: 10,
    };

    const paginationDto = new PaginationDto(props);

    expect(paginationDto.totalPages).toBe(11);
    expect(paginationDto.hasNextPage).toBe(true);
    expect(paginationDto.hasPrevPage).toBe(false);
  });

  it('should set hasPrevPage to false and hasNextPage to true on the first page', async () => {
    const props = {
      total: 100,
      page: 1,
      limit: 10,
    };

    const paginationDto = new PaginationDto(props);

    expect(paginationDto.hasNextPage).toBe(true);
    expect(paginationDto.hasPrevPage).toBe(false);
  });

  it('should set hasPrevPage and hasNextPage to true for a middle page', async () => {
    const props = {
      total: 100,
      page: 5,
      limit: 10,
    };
    const paginationDto = new PaginationDto(props);

    expect(paginationDto.hasNextPage).toBe(true);
    expect(paginationDto.hasPrevPage).toBe(true);
  });

  it('should set hasNextPage to false and hasPrevPage to true on the last page', async () => {
    const props = {
      total: 100,
      page: 10,
      limit: 10,
    };

    const paginationDto = new PaginationDto(props);

    expect(paginationDto.hasNextPage).toBe(false);
    expect(paginationDto.hasPrevPage).toBe(true);
  });

  it('should set both hasNextPage and hasPrevPage to false for a single page total', () => {
    const props = {
      total: 5,
      page: 1,
      limit: 10,
    };

    const paginationDto = new PaginationDto(props);

    expect(paginationDto.totalPages).toBe(1);
    expect(paginationDto.hasNextPage).toBe(false);
    expect(paginationDto.hasPrevPage).toBe(false);
  });
});
