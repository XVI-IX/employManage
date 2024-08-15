import { IQueryBuilder, PartialCondition } from '@app/common/domain/adapters';

export function ILike<T>(
  field: keyof T,
  value: T[keyof T] extends string ? string : never,
): PartialCondition<T> {
  const condition: PartialCondition<T> = {};
  const lowerField = field;
  const lowerValue = typeof value === 'string' ? `LOWER(${value})` : value;
  condition[lowerField as keyof T] = {
    $relational: '=',
    $value: `${lowerValue}`,
  };

  return condition;
}

export function Equal<T>(
  field: keyof T,
  value: T[keyof T],
): PartialCondition<T> {
  const condition: PartialCondition<T> = {};
  condition[field] = {
    $relational: '=',
    $value: value,
  };

  return condition;
}

export function NotEqual<T>(
  field: keyof T,
  value: T[keyof T],
): PartialCondition<T> {
  const condition: PartialCondition<T> = {};
  condition[field] = {
    $relational: '!=',
    $value: value,
  };

  return condition;
}

export function NotIn<T>(
  field: keyof T,
  value: T[keyof T],
): PartialCondition<T> {
  const condition: PartialCondition<T> = {};
  condition[field] = {
    $relational: 'NOT IN',
    $value: value,
  };

  return condition;
}

export function GreaterThan<T>(
  field: keyof T,
  value: T[keyof T],
): PartialCondition<T> {
  const condition: PartialCondition<T> = {};
  condition[field] = {
    $relational: '>',
    $value: value,
  };

  return condition;
}

export function LessThan<T>(
  field: keyof T,
  value: T[keyof T],
): PartialCondition<T> {
  const condition: PartialCondition<T> = {};
  condition[field] = {
    $relational: '<',
    $value: value,
  };

  return condition;
}

export function GreaterThanOrEqual<T>(
  field: keyof T,
  value: T[keyof T],
): PartialCondition<T> {
  const condition: PartialCondition<T> = {};
  condition[field] = {
    $relational: '>=',
    $value: value,
  };

  return condition;
}

export function LessThanOrEqual<T>(
  field: keyof T,
  value: T[keyof T],
): PartialCondition<T> {
  const condition: PartialCondition<T> = {};
  condition[field] = {
    $relational: '<=',
    $value: value,
  };

  return condition;
}

export class QueryBuilder<T> implements IQueryBuilder<T> {
  
}