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
   * @name insert
   * @description inserts a record
   * @param values values to insert
   */
  insert(values: Partial<T> | Partial<T>[]): IQueryBuilder<T>;

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

  /**
   * @name whereMonth
   * @description set the conditions to query by month
   * @param conditions month conditions to query
   */
  whereMonth(conditions: { field: keyof T; month: string }): IQueryBuilder<T>;

  /**
   * @name whereYear
   * @description set the conditions to query by YEar
   * @param conditions year conditions to query
   */
  whereYear(conditions: { field: keyof T; year: string }): IQueryBuilder<T>;

  /**
   * @name whereYearAndMonth
   * @description set the conditions to query by year and month
   * @param conditions set the conditions to query by year and month
   */
  whereYearAndMonth(conditions: {
    field: keyof T;
    year: string;
    month: string;
  }): IQueryBuilder<T>;

  /**
   * @name orderBy
   * @param field field to order the query results by
   * @param direction ASC | DESC
   */
  orderBy(field: keyof T, direction?: OrderDirection): IQueryBuilder<T>;

  /**
   * @name limit
   * @param limit number of records to be returned in query result
   */
  limit(limit: number): IQueryBuilder<T>;

  /**
   * @name offset
   * @param offset number of records to skip
   */
  offset(offset: number): IQueryBuilder<T>;

  /**
   * @name update
   * @param values values to update
   */
  update(values: Partial<T>): IQueryBuilder<T>;

  /**
   * @name Deletes a record
   */
  delete(): IQueryBuilder<T>;

  /**
   * @name build
   * @description builds the query
   */
  build(): string;
}
