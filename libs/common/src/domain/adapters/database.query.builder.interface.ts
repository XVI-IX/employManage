export type ComparisonOperator =
  | '='
  | '!='
  | '<>'
  | '>'
  | '>='
  | '<'
  | '<='
  | 'IN'
  | 'NOT IN'
  | 'IS NULL'
  | 'IS NOT NULL'
  | 'LIKE'
  | 'ILIKE'
  | 'BETWEEN'
  | 'NOT BETWEEN'
  | 'AND'
  | 'OR';

/**
 * @name Condition
 * @param T - Type of the model
 * @returns - { [K in keyof T]?: { $relational: ComparisonOperator; $value: T[K] | T[K][] } | any; }
 */
export type Condition<T> = {
  [K in keyof T]?:
    | { $relational: ComparisonOperator; $value: T[K] | T[K][] }
    | any;
};

/**
 * @name PartialCondition
 * @param T - Type of the model
 * @returns - Partial<Condition<T>> | { [K in keyof T]: T[K] | T[K][]; }
 */
export type PartialCondition<T> =
  | Partial<Condition<T>>
  | { [K in keyof T]: T[K] | T[K][] };

/**
 * @name OrderDirection
 * @type OrderDirection
 *
 * @returns - 'ASC' | 'DESC'
 */
export type OrderDirection = 'ASC' | 'DESC';

export interface IQueryBuilder<T> {
  /**
   * @name findOne
   */
  findOne(): IQueryBuilder<T>;

  /**
   * @name findAll
   */
  findAll(): IQueryBuilder<T>;

  /**
   * @name select
   * @param columns columns to select in query
   */
  select(columns: (keyof T | string)[]): IQueryBuilder<T>;

  /**
   * @name from
   * @description sets the table/collection to query
   * @param table
   */
  from(table: string): IQueryBuilder<T>;

  /**
   * @name where
   * @description set the conditions to query
   * @param conditions conditions to query
   */
  where(
    conditions: PartialCondition<T> | PartialCondition<T>[],
  ): IQueryBuilder<T>;
}
