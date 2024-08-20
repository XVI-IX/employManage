import {
  IQueryBuilder,
  OrderDirection,
  PartialCondition,
} from '@app/common/domain/adapters';
import { BadRequestException } from '@nestjs/common';

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
  private operation: 'SELECT' | 'UPDATE' | 'DELETE' | 'INSERT' = 'SELECT';
  private selectColums: (keyof T | string)[];
  private fromClause: string;
  private whereClause: string;
  private orderByClause: string;
  private limitClause: string;
  private offsetClause: string;
  private updateValues: Partial<T>;
  private insertValues: Partial<T>[];

  constructor() {
    this.selectColums = [];
    this.fromClause = '';
    this.whereClause = '';
    this.orderByClause = '';
    this.limitClause = '';
    this.offsetClause = '';
    this.updateValues = {};
  }

  findOne(): QueryBuilder<T> {
    this.operation = 'SELECT';
    this.selectColums = ['*'];
    this.limitClause = 'LIMIT 1';
    return this;
  }

  findAll(): QueryBuilder<T> {
    this.operation = 'SELECT';
    this.selectColums = ['*'];
    return this;
  }

  select(columns: (keyof T | string)[]): QueryBuilder<T> {
    this.operation = 'SELECT';
    this.selectColums = columns;
    return this;
  }

  insert(values: Partial<T> | Partial<T>[]): IQueryBuilder<T> {
    this.operation = 'INSERT';

    if (Array.isArray(values)) {
      this.insertValues = values;
    } else {
      this.insertValues = [values];
    }

    return this;
  }

  from(table: string): QueryBuilder<T> {
    this.fromClause = `FROM ${table}`;
    return this;
  }

  where(
    conditions: PartialCondition<T> | PartialCondition<T>[],
  ): QueryBuilder<T> {
    if (Array.isArray(conditions)) {
      this.whereClause = `WHERE (${conditions.map(this.formatCondition).join(') OR (')})`;
    } else if (conditions) {
      if (Object.keys(conditions).length === 0) {
        return this;
      }

      this.whereClause = `WHERE (${this.formatCondition(conditions)})`;
    }
    return this;
  }

  andWhere(conditions: PartialCondition<T>): QueryBuilder<T> {
    if (this.whereClause === '') {
      this.whereClause = `WHERE (${this.formatCondition(conditions)})`;
    } else {
      this.whereClause += `AND (${this.formatCondition(conditions)})`;
    }

    return this;
  }

  orWhere(conditions: PartialCondition<T>[]): QueryBuilder<T> {
    if (this.whereClause === '') {
      this.whereClause = `WHERE (${conditions.map(this.formatCondition).join(' OR')})`;
    } else {
      this.whereClause += `OR (${conditions.map(this.formatCondition).join(' OR')})`;
    }

    return this;
  }

  orderBy(field: keyof T, direction?: OrderDirection): QueryBuilder<T> {
    if (!field) {
      return this;
    }

    if (this.orderByClause === '') {
      this.orderByClause = `ORDER BY ${String(field)} ${direction || 'ASC'}`;
    } else {
      this.orderByClause += `, ${String(field)} ${direction || 'ASC'}`;
    }

    return this;
  }

  limit(limit: number): QueryBuilder<T> {
    this.limitClause = `LIMIT ${limit ? limit : 50}`;
    return this;
  }

  offset(offset: number): QueryBuilder<T> {
    this.offsetClause = `OFFSET ${offset ? offset : 0}`;
    return this;
  }

  update(values: Partial<T>): QueryBuilder<T> {
    this.operation = 'UPDATE';
    this.updateValues = values;
    return this;
  }

  delete(): QueryBuilder<T> {
    this.operation = 'DELETE';
    return this;
  }

  build(): string {
    switch (this.operation) {
      case 'SELECT':
        const selectClause =
          this.selectColums.length > 0
            ? `SELECT ${this.selectColums.join(', ')}`
            : 'SELECT *';
        return `${selectClause}${this.fromClause}${this.whereClause}${this.orderByClause}${this.limitClause}${this.offsetClause};`;
      case 'UPDATE':
        const updateClause = `UPDATE ${this.fromClause} SET ${Object.keys(
          this.updateValues,
        )
          .map(
            (field) =>
              `${String(field)} = ${typeof this.updateValues[field] === 'string' ? `"${this.updateValues[field]}"` : this.updateValues[field]}`,
          )
          .join(', ')}`;
        return `${updateClause}${this.whereClause};`;
      case 'DELETE':
        return `DELETE ${this.fromClause}${this.whereClause};`;
      case 'INSERT':
        if (!this.fromClause) {
          throw new BadRequestException('Table name is required');
        }
        const columns = Object.keys(this.insertValues[0]).join(', ');
        const values = this.insertValues
          .map(
            (valueObj) =>
              `(${Object.values(valueObj)
                .map((value) =>
                  typeof value === 'string' ? `"${value}"` : value,
                )
                .join(', ')})`,
          )
          .join(', ');
        return `INSERT INTO ${this.fromClause} (${columns}) VALUES ${values};`;
      default:
        throw new Error('Invalid operation');
    }
  }

  private formatCondition(
    condition: PartialCondition<T> | { [x: string]: any },
  ): string {
    if (Array.isArray(condition)) {
      const formattedConditions = condition.map((condition) => {
        return Object.keys(condition)
          .map((field) => {
            const value = condition[field];
            if (
              typeof value === 'object' &&
              '$relational' in value &&
              '$value' in value
            ) {
              const formattedValue = Array.isArray(value.$value)
                ? `(${value.$value.map((v) => (typeof v === 'number' || typeof v === 'boolean' ? v : `"${v}"`)).join(', ')})`
                : typeof value.$value === 'number' ||
                    typeof value.$value === 'boolean'
                  ? value.$value
                  : `"${value.$value}"`;
              return `${field} ${value.$relational} ${formattedValue}`;
            } else {
              const formattedValue =
                typeof value === 'number' || typeof value === 'boolean'
                  ? value
                  : `"${value}"`;
              return `${field} = ${formattedValue}`;
            }
          })
          .join(' OR ');
      });

      return '(' + formattedConditions.join(') OR (') + ')';
    }

    const conditions: string[] = [];
    for (const field in condition) {
      if (condition.hasOwnProperty(field)) {
        const conditionObj = condition[field];
        if (
          typeof conditionObj === 'object' &&
          '$relational' in conditionObj &&
          '$value' in conditionObj
        ) {
          const formattedValue = Array.isArray(conditionObj.$value)
            ? `(${conditionObj.$value.map((v) => (typeof v === 'number' || typeof v === 'boolean' ? v : `"${v}"`)).join(', ')})`
            : typeof conditionObj.$value === 'boolean' ||
                typeof conditionObj.$value === 'number'
              ? conditionObj.$value
              : `"${conditionObj.$value}"`;
          conditions.push(
            `${field} ${conditionObj.$relational} ${formattedValue}`,
          );
        } else {
          const formattedValue =
            typeof conditionObj === 'number' ||
            typeof conditionObj === 'boolean'
              ? conditionObj
              : `"${conditionObj}"`;
          conditions.push(`${field} =  ${formattedValue}`);
        }
      }
    }
    return conditions.join(' AND ');
  }
}
