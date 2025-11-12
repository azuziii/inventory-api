import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';

export function mapToOutput<T, V>(
  DtoClass: ClassConstructor<T>,
  source: V[],
  options?: ClassTransformOptions,
): T[];

export function mapToOutput<T, V>(
  DtoClass: ClassConstructor<T>,
  source: V,
  options?: ClassTransformOptions,
): T;

export function mapToOutput<T, V>(
  DtoClass: ClassConstructor<T>,
  source: V | V[],
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DtoClass, source, {
    excludeExtraneousValues: true,
    ...options,
  });
}
